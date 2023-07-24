/**
 * Abonnement tel qu'envoyé par le backend, à convertir avant utilisation
 */
export interface AbonnementFromBackend {
  id: string,
  id_client: string,
  date_debut: string,
  date_fin: string,
  vcores: string,
  ram: string,
  disque: string,
  bande_passante: string,
  os: string,
  prix: string
}
