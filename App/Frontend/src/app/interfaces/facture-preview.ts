/**
 * Facture contant le minimum d'informations pour être affichée dans une liste de facture
 */
export interface FacturePreview {
  id_facture: number,
  id_abonnement: number,
  date_facture: Date,
  montant: number
}
