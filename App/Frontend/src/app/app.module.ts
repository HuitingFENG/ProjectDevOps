import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from "@angular/common/http";
import { ReactiveFormsModule} from "@angular/forms";

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from "ngx-bootstrap/modal";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { ChartsModule } from "ng2-charts";

import { WelcomePageComponent } from './components/public/welcome-page/welcome-page.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component';
import { ServerCardComponent } from './components/reusable/server-card/server-card.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { FormFieldComponent } from './components/reusable/form-field/form-field.component';
import { ServerErrorPageComponent } from './components/public/server-error-page/server-error-page.component';
import { NavbarComponent } from './components/reusable/navbar/navbar.component';
import { ListeFactureComponent } from './components/private/liste-facture/liste-facture.component';
import { DetailFactureComponent } from './components/private/detail-facture/detail-facture.component';
import { DetailServeurComponent } from './components/private/detail-serveur/detail-serveur.component';
import { LouerServeurComponent } from './components/private/louer-serveur/louer-serveur.component';
import { FormuleCardComponent } from './components/reusable/formule-card/formule-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginComponent,
    RegisterComponent,
    ServerCardComponent,
    DashboardComponent,
    ServerErrorPageComponent,
    FormFieldComponent,
    NavbarComponent,
    ListeFactureComponent,
    DetailFactureComponent,
    DetailServeurComponent,
    LouerServeurComponent,
    FormuleCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
