const PDFDocument = require('pdfkit');
const fs = require('fs');

/**
 * Déclenche le téléchargement de la facture passée en paramètre d'URL au format pdf
 *
 * L'utilisateur appellant cette route doit posséder la facture pour pouvoir la télécharger
 *
 * @param req
 * @param res
 * @param database
 * @return {Promise<void>}
 */
module.exports = async (req, res, database) => {
    const client = req.session.userId;
    const id_facture = req.params['factureId'];

    if(id_facture === undefined){
        res.status(400).json({message: "missing paramaters"});
    }

    // Récupération des informations
    const result = (await database.query(`  SELECT facture.id as id_facture,
                                                  abonnement.id as id_abonnement,
                                                  compte.nom as nom,
                                                  compte.prenom as prenom,
                                                  compte.email as email,
                                                  date_facture,
                                                  montant,
                                                  vcore_config.nombre as vcores, 
                                                  ram_config.affichage as ram, 
                                                  disque_config.affichage as disque, 
                                                  io_config.vitesse as bande_passante,
                                                  os_config.nom_systeme as os,
                                                  vcore_config.prix as vcores_prix, 
                                                  ram_config.prix as ram_prix, 
                                                  disque_config.prix as disque_prix, 
                                                  io_config.prix as io_prix,
                                                  os_config.prix as os_prix
                                           FROM facture LEFT JOIN abonnement ON abonnement.id = facture.id_abonnement
                                                        LEFT JOIN compte ON compte.id = abonnement.id_client
                                                        LEFT JOIN ram_config ON ram_config.quantite = abonnement.ram
                                                        LEFT JOIN vcore_config ON vcore_config.nombre = abonnement.vcores
                                                        LEFT JOIN disque_config ON disque_config.espace = abonnement.disque
                                                        LEFT JOIN io_config ON io_config.vitesse = abonnement.vitesse_io
                                                        LEFT JOIN os_config ON os_config.nom_systeme = abonnement.os
                                           WHERE facture.id = ? AND id_client = ?;`, [id_facture, client]))[0][0];

    // Si la facture n'existe pas, ou qu'elle existe mais qu'elle n'est pas au nom de l'utilisateur appellant
    if(!result){
        res.status(404).json({message: "Pas de facture trouvée"});
    }

    // On génère le PDF
    const path = __dirname.slice(0, -7) + `\\pdf\\facture-${client}-${id_facture}.pdf`
    const writeStream = fs.createWriteStream(path)

    generatePdf(writeStream, result, client);

    // On attend que le fichier ait fini d'être écrit sur le disque
    writeStream.on('finish', () => {
        // Une fois le fichier écrit, on envoie le document
        res.download(path, `facture-${client}-${id_facture}.pdf`, () => {
            // Après envoi on le supprime du stockage temporaire
            fs.unlink(path, () => {});
        });
    });
}

/**
 * Génère une facture au format pdf dans le stream passé en paramètre
 *
 * /!\ La fonction est synchrone mais l'écriture dans le fichier ne l'est pas. Il est nécéssaire de mettre en place un event listener hors de la fonction sur le writeStream pour être sûr que l'écriture est terminée avant de poursuivre.
 *
 * @param writeStream fs.createWriteStream du fichier vers lequel on écrit
 * @param data Données de la facture
 * @param client N° de client du détenteur de la facture
 */
function generatePdf(writeStream, data, client) {
    const pdfDoc = new PDFDocument({size: 'A4'});
    pdfDoc.pipe(writeStream);

    // Titre
    pdfDoc
        .fontSize(42)
        .fillColor("#01386a")
        .text("Alterra VPS", {align: "center"})
        .fillColor("#000")
        .fontSize(12)
        .moveDown(2);

    // Informations sur la facture
    pdfDoc.text(`Facture du ${new Date(data['date_facture']).toLocaleDateString()}`, {align: "right"});
    pdfDoc.text(`Numéro de facture ${data['id_facture']}`, {align: "right"});
    pdfDoc.text(`Numéro de commande ${data['id_abonnement']}`, {align: "right"});
    pdfDoc.text(`Numéro de client ${client}`, {align: "right"});

    // Informations sur le client
    pdfDoc.text(`${data['nom']} ${data['prenom']}`, {align: "left"});
    pdfDoc.text(`${data['email']}`, {align: "left"});

    // Informations sur l'abonnement
    pdfDoc
        .moveDown(2)
        .fontSize(30)
        .text("Serveur Virtuel Privé")
        .fontSize(12);

    // Utilitaire pour afficher proprement les prix en euros
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });

    // Header du tableau
    insert_table_row(pdfDoc, "Composant", "Option", "Prix")
    horizontal_line(pdfDoc, 0, 1);
    // Contenu du tableau
    insert_table_row(pdfDoc, "Vcores", `${data['vcores']}`, `${formatter.format(data['ram_prix']/100)}`)
    insert_table_row(pdfDoc, "RAM", `${data['ram']}`, `${formatter.format(data['vcores_prix']/100)}`)
    insert_table_row(pdfDoc, "Espace disque", `${data['disque']}`, `${formatter.format(data['disque_prix']/100)}`)
    insert_table_row(pdfDoc, "Système d'exploitation", `${data['os']}`, `${formatter.format(data['os_prix']/100)}`)
    insert_table_row(pdfDoc, "Bande passante", `${data['bande_passante']} Mb/s`, `${formatter.format(data['io_prix']/100)}`)

    // Total
    horizontal_line(pdfDoc, 1, 1);
    pdfDoc.text(`Total à payer (TTC) : ${formatter.format(data['montant']/100)}`, 72, pdfDoc.y, {align: 'right'});

    pdfDoc.moveDown(2);

    pdfDoc
        .fontSize(10)
        .text("Le paiement du montant dû vous sera facturé à la date correspondante via la méthode de paiement que vous avez choisie.")
        .fontSize(17);

    // Fin du document
    pdfDoc.end();
}

/**
 * Ajoute une ligne horizontale commençant à 20px du bord gauche et allant jusqu'à 20px du bord droit de la page
 *
 * @param pdfDoc Document où ajouter la ligne
 * @param margin_up Espace (en lignes) à laisser vide au dessus de la ligne
 * @param margin_down Espace (en lignes) à laisser vide en dessous de la ligne
 */
function horizontal_line(pdfDoc, margin_up = 0, margin_down = 0){
    pdfDoc
        .moveDown(margin_up)
        .lineCap('round')
        .lineWidth(2)
        .moveTo(20, pdfDoc.y)
        .lineTo(pdfDoc.page.width - 20, pdfDoc.y)
        .stroke()
        .moveDown(margin_down);
}

/**
 * Insère une ligne de trois cases dans le document passé en paramètre.
 * Les cases mesurent 200px de large.
 *
 * @param pdfDoc Document dans lequel insérer la ligne
 * @param left Case de gauche
 * @param center Case du milieu
 * @param right Case de droite
 */
function insert_table_row(pdfDoc, left, center, right){
    // PDFKit ne dispose pas encore de fonctionnalité pour faire des tableaux. On en crée donc un nous-mêmes en décallant de 200px le texte pour chaque colonne
    pdfDoc
        .text(left, 72, pdfDoc.y, {lineBreak: false})
        .text(center, 72 + 200, pdfDoc.y, {lineBreak: false})
        .text(right, 72 + 400, pdfDoc.y);
}
