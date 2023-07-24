/**
 * FacturePreview telle qu'envoyée par le backend ; à convertir avant utilisation
 */
export interface FacturePreviewFromBackend {
  id_facture: string,
  id_abonnement: string,
  date_facture: string,
  montant: string
}
