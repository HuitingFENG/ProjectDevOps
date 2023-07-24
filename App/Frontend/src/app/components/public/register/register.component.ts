import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthenticatorService} from "../../../services/authenticator/authenticator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Entrées utilisateur
  registerForm = this.formBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email,
    ])),
    passwords: this.formBuilder.group({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    }, {validator: this.ValidatePassword}),
    prenom: new FormControl('', Validators.compose([
      Validators.required
    ])),
    nom: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  // Messages d'erreur à afficher pour chaque validateur incorrect
  validation_messages = {
    email: [
      {type: 'required', message: 'E-mail requis'},
      {type: 'email', message: 'Veuillez entrer un e-mail valide'}
    ],
    passwords: [
      {type: 'required', message: 'Mot de passe requis'},
      {type: 'validPasswordLength', message: 'Le mot de passe doit faire au moins 8 caractères'},
      {type: 'validSecondPassword', message: 'Les mots de passe sont différents'},
    ],
    prenom: [
      {type: 'required', message: 'Veuillez entrer votre prénom'}
    ],
    nom: [
      {type: 'required', message: 'Veuillez entrer votre nom'}
    ]
  };

  constructor(
    private authenticatorService: AuthenticatorService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  /**
   * Vérifie que le mot de passe fasse bien 8 caractères minimum, et qu'il soit indentique au mot de passe de la seconde case
   * @param control
   * @constructor
   */
  ValidatePassword(control: AbstractControl) {
    if (control.get('password')?.value.length < 8) {
      return {validPasswordLength: true}
    } else if (control.get('password')?.value !== control.get('confirm_password')?.value) {
      return {validSecondPassword: true};
    } else {
      return null;
    }
  }

  /**
   * Tente d'inscrire l'utilisateur auprès du serveur
   */
  register() {
    const values = this.registerForm.value
    const new_user = {
      email : values.email,
      password : values.passwords.password,
      nom : values.nom,
      prenom : values.prenom
    };
    this.authenticatorService.register(new_user).subscribe(_ => {
      this.router.navigate(['/dashboard']);
    }, err => {
      if (err.error.message.includes("user already exists")) {
        alert("Cet utilisateur existe déjà.")
      } else if (err.status === 400) {
        alert("Informations incorrectes, veuillez rééssayer")
      } else if (err.status === 401) {
        this.router.navigate(['/dashboard']);
      } else {
        alert("Une erreur est survenue, merci de rééssayer.")
      }
    })
  }

  /**
   * Retourne "true" si le validateur demandé du contrôle demandé est invalide, false sinon
   * Retourne également true si le contrôle n'existe pas
   * @param name Nom du contrôle à valider
   * @param validation Nom du validateur à vérifier
   */
  invalid_input(name: string, validation: any) {
    let control: AbstractControl | null = this.registerForm.get(name);
    if (control){
      return control.hasError(validation) && (control.dirty || control.touched);
    } else {
      return true;
    }
  }
}
