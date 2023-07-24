DROP TABLE IF EXISTS formule;
DROP TABLE IF EXISTS facture;
DROP TABLE IF EXISTS abonnement;
DROP TABLE IF EXISTS io_config;
DROP TABLE IF EXISTS disque_config;
DROP TABLE IF EXISTS os_config;
DROP TABLE IF EXISTS vcore_config;
DROP TABLE IF EXISTS ram_config;
DROP TABLE IF EXISTS compte;

CREATE TABLE compte (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nom TEXT,
    prenom TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE ram_config (
	quantite INT PRIMARY KEY,
	affichage VARCHAR(20),
    prix INT  -- /!\ Les prix sont toujours exprimés en centimes d'euros pour éviter les erreurs de calculs des FLOAT
);

CREATE TABLE vcore_config (
	nombre INT PRIMARY KEY,
    min_ram INT,
    max_ram INT,
    prix INT,
    FOREIGN KEY (min_ram) REFERENCES ram_config(quantite),
    FOREIGN KEY (max_ram) REFERENCES ram_config(quantite)
);

CREATE TABLE os_config (
	nom_systeme VARCHAR(255) PRIMARY KEY,
    min_ram INT,
    prix INT,
    FOREIGN KEY (min_ram) REFERENCES ram_config(quantite)
);

CREATE TABLE disque_config (
	espace INT PRIMARY KEY,
	affichage VARCHAR(20),
    prix INT
);

CREATE TABLE io_config (
	vitesse INT PRIMARY KEY,
    prix INT
);

CREATE TABLE abonnement (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT,
    date_debut DATE,
    date_fin DATE,
    vcores INT,
    ram INT,
    os VARCHAR(255),
    disque INT,
    vitesse_io INT,
    FOREIGN KEY (id_client) REFERENCES compte(id),
    FOREIGN KEY (vcores) REFERENCES vcore_config(nombre),
    FOREIGN KEY (ram) REFERENCES ram_config(quantite),
    FOREIGN KEY (os) REFERENCES os_config(nom_systeme),
    FOREIGN KEY (disque) REFERENCES disque_config(espace),
    FOREIGN KEY (vitesse_io) REFERENCES io_config(vitesse)
);

CREATE TABLE facture (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_abonnement INT,
    date_facture DATE,
    montant INT,
    FOREIGN KEY (id_abonnement) REFERENCES abonnement(id)
);

CREATE TABLE formule (
	nom_formule VARCHAR(255) PRIMARY KEY,
    display_order INT, -- Permet de forcer X ou Y offre à apparaître à une place précise
	description TEXT,
    vcores INT,
    ram INT,
    disque INT,
    vitesse_io INT,
    FOREIGN KEY (vcores) REFERENCES vcore_config(nombre),
    FOREIGN KEY (ram) REFERENCES ram_config(quantite),
    FOREIGN KEY (disque) REFERENCES disque_config(espace),
    FOREIGN KEY (vitesse_io) REFERENCES io_config(vitesse)
);

INSERT INTO compte(prenom, nom, email, password) VALUES ("Enzo", "Filangi", "enzo.filangi@efrei.net", "$2b$10$ZzvOTEGSHwtfKf9nHzRdEunchC.4traFyQuoA.oti0BX/vNulJtHq");

INSERT INTO ram_config(quantite, affichage, prix) VALUES (512, "512 Mo", 100), 
														 (1024, "1 Go", 200), 
														 (2048, "2 Go", 300), 
														 (4096, "4 Go", 600), 
														 (8192, "8 Go", 1000), 
														 (16384, "16 Go", 1500), 
														 (32768, "32 Go", 2500), 
														 (65536, "64 Go", 4000);

INSERT INTO vcore_config(nombre, min_ram, max_ram, prix) VALUES (2, 512, 2048, 200),
																(4, 1024, 8192, 400),
																(8, 2048, 16384, 800),
																(16, 8192, 32768, 2000),
																(32, 16384, 65536, 5000);
                                
INSERT INTO os_config(nom_systeme, min_ram, prix) VALUES ("Debian 9", 512, 0),
														 ("Debian 10", 512, 0),
														 ("CentOS 5", 512, 0),
														 ("Windows Server Core", 512, 10000),
														 ("Ubuntu", 1024, 0),
														 ("CentOS 7", 1024, 0),
														 ("Windows Server GUI", 2048, 10000);
                             
INSERT INTO disque_config(espace, affichage, prix) VALUES (10, "10 Go", 100),
														 (50, "50 Go", 200),
														 (100, "100 Go", 400),
														 (500, "500 Go", 800),
														 (1000, "1 To", 1600),
														 (2000, "2 To", 3200);
                                
INSERT INTO io_config(vitesse, prix) VALUES (100, 200), 
											(300, 500), 
											(1000, 1500);
                             
INSERT INTO abonnement(id_client, date_debut, date_fin, vcores, ram, os, disque, vitesse_io) VALUES (1, "2021-06-10", "2021-08-31", 8, 16384, "Ubuntu", 500, 300),
																									(1, "2021-09-01", null, 16, 32768, "Debian 10", 500, 1000);
                                                                                                     
INSERT INTO facture(id_abonnement, date_facture, montant) VALUES (1, "2021-06-10", 3600),
																 (1, "2021-07-01", 3600),
																 (1, "2021-08-01", 3600),
																 (2, "2021-09-01", 6800),
																 (2, "2021-10-01", 6800);

INSERT INTO formule(nom_formule, display_order, description, vcores, ram, disque, vitesse_io) VALUES ("Essentiel", 1, "Pour les petit budgets", 2, 512, 10, 100),
																									 ("Confort", 2, "N'ayez plus de limites dans vos projets", 4, 8192, 500, 300),
																									 ("Elite", 3, "Exploitez une incroyable puissance de calcul", 16, 32768, 1000, 1000),
																									 ("Site web", 4, "Rendez votre site internet capable d'encaisser de nombreux utilisateurs", 4, 8192, 100, 1000),
																									 ("Archivage cloud", 5, "Stockez vos fichiers pour qu'ils soient accessibles partout", 2, 1024, 2000, 1000);
																					  





