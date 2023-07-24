import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Entrée des indentifiants de l'utilisateur
  loginForm:FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Messages d'erreur à afficher pour chaque validateur incorrect
    validation_messages = {
      email: [
      {type: 'required', message: 'E-mail requis'}
    ],
      password: [
      {type: 'required', message: 'Mot de passe requis'}
    ]
  };

  // Contrôle l'affichage du message d'identifiants invalides
  wrong_credentials = false;

  constructor(
    private authenticatorService: AuthenticatorService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  /**
   * Tente de connecter l'utilisateur à partir des informations fournies sur la page
   */
  authenticate() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.wrong_credentials = false;
    this.authenticatorService.authenticate(email, password).subscribe(_ => {
      // Si l'authentification se passe correctement, on renvoie l'utilisateur à la page principale
      this.router.navigate(['/dashboard']);
    }, error => {
      switch (error.status){
        case 401:
          // S'il s'avère que l'utilisateur est déjà connecté, on le renvoie à la page principale
          this.router.navigate(['/dashboard']);
          break;
        case 400:
          // Si les identifiants sont invalides, on l'affiche
          this.wrong_credentials = true;
          setTimeout(() => this.wrong_credentials = false, 3000); // Et on le désaffiche au bout de quelques secondes
          break;
        default:
          alert("Une erreur est survenue, veuillez rééssayer.");
      }
    })
  }
}
