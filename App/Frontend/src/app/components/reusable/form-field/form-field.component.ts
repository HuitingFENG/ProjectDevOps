import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {

  @Input() title: string = '';
  @Input() form_control_name: string = '';
  @Input() validation_messages: any = '';
  @Input() form: FormGroup | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Retourne "true" si le validateur demandé du contrôle demandé est invalide, false sinon
   * Retourne également true si le contrôle n'existe pas
   * @param name Nom du contrôle à valider
   * @param validation Nom du validateur à vérifier
   */
  invalid_input(name: string, validation: any) {
    let control: AbstractControl | null | undefined = this.form?.get(name);
    if (control){
      return control.hasError(validation) && (control.dirty || control.touched);
    } else {
      return true;
    }
  }
}
