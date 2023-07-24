/**
 * Objet contenant toutes les informations d'un abonnement
 */
export interface Abonnement {
  id: number,
  id_client: number,
  date_debut: Date,
  date_fin: Date | null,
  vcores: string,
  ram: string,
  disque: string,
  bande_passante: string,
  os: string,
  prix: number
}
