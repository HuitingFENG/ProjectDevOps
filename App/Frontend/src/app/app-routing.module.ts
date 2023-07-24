import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";

import {AuthGuardService} from "./services/authGuard/auth-guard.service";
import {AuthPreventService} from "./services/authPrevent/auth-prevent.service";

import {WelcomePageComponent} from "./components/public/welcome-page/welcome-page.component";
import {LoginComponent} from "./components/public/login/login.component";
import {RegisterComponent} from "./components/public/register/register.component";
import {DashboardComponent} from "./components/private/dashboard/dashboard.component";
import {ServerErrorPageComponent} from "./components/public/server-error-page/server-error-page.component";
import {ListeFactureComponent} from "./components/private/liste-facture/liste-facture.component";
import {DetailFactureComponent} from "./components/private/detail-facture/detail-facture.component";
import {DetailServeurComponent} from "./components/private/detail-serveur/detail-serveur.component";
import {LouerServeurComponent} from "./components/private/louer-serveur/louer-serveur.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthPreventService]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthPreventService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'factures', component: ListeFactureComponent, canActivate: [AuthGuardService]},
  { path: 'facture/:idFacture', component: DetailFactureComponent, canActivate: [AuthGuardService]},
  { path: 'serveur/:idServeur', component: DetailServeurComponent, canActivate: [AuthGuardService]},
  { path: 'louer', component: LouerServeurComponent, canActivate: [AuthGuardService]},
  { path: 'error', component: ServerErrorPageComponent},
  { path: '**', component: WelcomePageComponent, canActivate: [AuthPreventService]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
