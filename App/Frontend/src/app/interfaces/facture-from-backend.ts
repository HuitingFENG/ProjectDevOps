/**
 * Facture telle qu'envoyée par le backend ; à convertir avant utilisation
 */
export interface FactureFromBackend {
  id_facture: string,
  id_abonnement: string,
  date_facture: string,
  montant: string,
  vcores: string,
  ram: string,
  disque: string,
  bande_passante: string,
  os: string,
  vcores_prix: string,
  ram_prix: string,
  disque_prix: string,
  io_prix: string,
  os_prix: string,
}
