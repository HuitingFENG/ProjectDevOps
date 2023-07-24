import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {FacturePreviewFromBackend} from "../../interfaces/facture-preview-from-backend";
import {FacturePreview} from "../../interfaces/facture-preview";
import {Facture} from "../../interfaces/facture";
import {FactureFromBackend} from "../../interfaces/facture-from-backend";

@Injectable({
  providedIn: 'root'
})
export class FactureManagerService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retourne la liste de toutes les factures de l'utilisateur actuellement connecté, sous forme de FacturePreview
   */
  getAllFactures(): Observable<FacturePreview[]> {
    return this.http.get(environment.api_url + '/factures', {withCredentials: true}).pipe(map(
      (v) => {
        const value: FacturePreviewFromBackend[] = <FacturePreviewFromBackend[]>v;
        const liste: FacturePreview[] = [];
        for(let facturePreview of value){
          liste.push({
            date_facture: new Date(facturePreview.date_facture),
            id_abonnement: parseInt(facturePreview.id_abonnement, 10),
            id_facture: parseInt(facturePreview.id_facture, 10),
            montant: parseInt(facturePreview.montant, 10)
          })
        }
        return liste;
      }
    ))
  }

  /**
   * Retourne la facture dont l'id est passée en paramètre sous la forme d'un Facture
   */
  getFacture(id: number): Observable<Facture> {
    return this.http.get(environment.api_url + '/facture/' + id, {withCredentials: true}).pipe(map(
      (v) => {
        const value: FactureFromBackend = <FactureFromBackend>v;
        return {
          bande_passante: value.bande_passante,
          date_facture: new Date(value.date_facture),
          disque: value.disque,
          disque_prix: parseInt(value.disque_prix, 10),
          id_abonnement: parseInt(value.id_abonnement, 10),
          id_facture: parseInt(value.id_facture, 10),
          io_prix: parseInt(value.io_prix, 10),
          montant: parseInt(value.montant, 10),
          os: value.os,
          os_prix: parseInt(value.os_prix, 10),
          ram: value.ram,
          ram_prix: parseInt(value.ram_prix, 10),
          vcores: value.vcores,
          vcores_prix: parseInt(value.vcores_prix, 10)
        };
      }
    ))
  }

  // Formatte un nombre (float) en euros
  readonly formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  /**
   * Prend un prix en centimes en entrée et retourne un string correspondant à sa valeur en euros
   * @param amount
   */
  formatCurrency(amount: number): string {
    return this.formatter.format(amount/100);
  }
}
