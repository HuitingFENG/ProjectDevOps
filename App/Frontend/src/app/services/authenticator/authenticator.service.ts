import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  /**
   * Envoie les informations fournies au serveur pour tenter d'authentifier l'utilisateur
   * @param username
   * @param password
   */
  authenticate(username: string, password: string): Observable<object> {
    return this.http.post(environment.api_url + '/login', {
      username,
      password
    }, {
      withCredentials: true
    });
  }

  /**
   * Envoie les informations fournies au serveur pour tenter d'inscrire l'utilisateur
   * @param new_user
   */
  register(new_user: any): Observable<object> {
    return this.http.post(environment.api_url + "/register", new_user, {withCredentials: true});
  }

  /**
   * Déconnecte l'utilisateur
   */
  disconnect(){
    this.http.post(environment.api_url + '/disconnect', null, {withCredentials: true}).subscribe(() => {
      this.router.navigate(['/']);
    }, (_) => {
      alert("Une erreur est survenue lors de la déconnexion");
      this.router.navigate(['/login']);
    });
  }

  /**
   * Renvoie true si l'utilisateur est connecté, false sinon
   */
  isConnected(): Observable<boolean>{
    return this.http.get(
      environment.api_url + "/connection_status",
      {withCredentials: true}
    ).pipe(
      map(value => (<IConnectionStatusAnswer>value).connected)
    );
  }

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}
}

/**
 * Interface de la réponse du serveur pour la requête d'obtention du statut de connexion
 */
interface IConnectionStatusAnswer {
  connected: boolean;
}
