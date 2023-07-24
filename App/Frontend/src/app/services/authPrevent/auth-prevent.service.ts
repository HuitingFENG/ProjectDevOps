import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import {Observable, of} from "rxjs";
import {AuthenticatorService} from "../authenticator/authenticator.service";
import {catchError, map} from "rxjs/operators"

/**
 *  Cette classe empêche les utilisateurs connectés d'accéder aux routes qu'elle protège
 */
@Injectable({
  providedIn: 'root'
})
export class AuthPreventService implements CanActivate {
  constructor(public authenticatorService: AuthenticatorService, public router: Router) {}

  /**
   * Retourne la valeur opposée de authenticatorService.isConnected()
   * Si l'utilisateur est déjà connecté, se charge de le rediriger vers la page principale
   */
  canActivate():Observable<boolean> {
    return this.authenticatorService.isConnected().pipe(
      map((auth) => {
        if(auth){
          this.router.navigate(["/dashboard"]);
        }
        return !auth;
      }),
      catchError((_) => {
        this.router.navigateByUrl('/error');
        return of(false);
      })
    );
  }
}
