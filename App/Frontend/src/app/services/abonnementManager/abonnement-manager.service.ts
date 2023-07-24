import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AbonnementFromBackend} from "../../interfaces/abonnement-from-backend";
import {Abonnement} from "../../interfaces/abonnement";
import {Formule} from "../../interfaces/formule";

@Injectable({
  providedIn: 'root'
})
export class AbonnementManagerService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retourne tous les abonnements de l'utilisateur connecté sous la forme d'une liste d'instances d'Abonnement
   */
  getAllAbonnements(): Observable<Abonnement[]> {
    return this.http.get(environment.api_url + "/abonnements", {withCredentials: true}).pipe(map(
      (v) => {
        const value: AbonnementFromBackend[] = <AbonnementFromBackend[]>v;
        const liste: Abonnement[] = [];
        for (let abonnement of value){
          liste.push({
            id: parseInt(abonnement.id, 10),
            id_client: parseInt(abonnement.id_client, 10),
            date_debut: new Date(abonnement.date_debut),
            date_fin: abonnement.date_fin ? new Date(abonnement.date_fin) : null,
            vcores: abonnement.vcores,
            ram: abonnement.ram,
            disque: abonnement.disque,
            bande_passante: abonnement.bande_passante,
            os: abonnement.os,
            prix: parseInt(abonnement.prix, 10)
          })
        }
        return liste;
      }
    ));
  }

  /**
   * Retourne l'abonnement dont l'id est spécifié en paramètre sous forme d'une instance d'Abonnement
   * @param id
   */
  getAbonnement(id: number): Observable<Abonnement> {
    return this.http.get(environment.api_url + "/abonnement/" + id, {withCredentials: true}).pipe(map(
      (v) => {
        const value: AbonnementFromBackend = <AbonnementFromBackend>v;
        return <Abonnement>{
          id: parseInt(value.id, 10),
          id_client: parseInt(value.id_client, 10),
          date_debut: new Date(value.date_debut),
          date_fin: value.date_fin ? new Date(value.date_fin) : null,
          vcores: value.vcores,
          ram: value.ram,
          disque: value.disque,
          bande_passante: value.bande_passante,
          os: value.os,
          prix: parseInt(value.prix, 10)
        };
      }
    ));
  }

  /**
   * Retourne toutes les formules d'abonnement prédéfinies
   */
  getFormules(): Observable<Formule[]> {
    return this.http.get(environment.api_url + "/formules", {withCredentials: true}).pipe(map(value => <Formule[]>value));
  }

  /**
   * Retourne les différentes options de composants ainsi que les restrictions sur chacun d'entre eux
   */
  getComponentOptions(): Observable<any> {
    return this.http.get(environment.api_url + "/component_options");
  }

  /**
   * Prend en arguments les paramètres de l'abonnement et les transmet au backend pour la création d'un nouvel abonnement
   * @param vcores
   * @param ram
   * @param os
   * @param disque
   * @param vitesse_io
   */
  addAbonnement(vcores: number, ram: number, os: string, disque: number, vitesse_io: number): Observable<Object> {
    return this.http.post(environment.api_url + "/abonnement", {
      vcores,
      ram,
      os,
      disque,
      vitesse_io
    }, {withCredentials: true});
  }

  /**
   * Met fin à l'abonnement donc l'id est spécifiée
   * @param id
   */
  deleteAbonnement(id: number): Observable<Object> {
    return this.http.delete(environment.api_url + "/abonnement/" + id, {withCredentials: true});
  }
}
