import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import {Observable, of} from "rxjs";
import {AuthenticatorService} from "../authenticator/authenticator.service";
import {catchError, map} from "rxjs/operators";

/**
 *  Cette classe empêche les utilisateurs non connectés d'accéder aux routes qu'elle protège
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authenticatorService: AuthenticatorService, public router: Router) {}

  /**
   * Retourne la même valeur que authenticatorService.isConnected()
   * Si l'utilisateur n'est pas connecté, se charge également de la redirection vers la page de connexion
   */
  canActivate():Observable<boolean> {
    return this.authenticatorService.isConnected().pipe(
      map((auth) => {
        if(!auth){
          this.router.navigate(["/login"]);
        }
        return auth;
      }),
      catchError((_) => {
        this.router.navigateByUrl('/error');
        return of(false);
      })
    );
  }
}
