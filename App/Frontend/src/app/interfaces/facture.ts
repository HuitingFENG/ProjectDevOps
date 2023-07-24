/**
 * Objet contenant toutes les informations relatives à une facture
 */
export interface Facture {
  id_facture: number,
  id_abonnement: number,
  date_facture: Date,
  montant: number,
  vcores: string,
  ram: string,
  disque: string,
  bande_passante: string,
  os: string,
  vcores_prix: number,
  ram_prix: number,
  disque_prix: number,
  io_prix: number,
  os_prix: number,
}
