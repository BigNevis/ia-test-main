import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from "@angular/forms";
import { I18nService } from "@services/i18nService";

@Component({
  selector: 'form-field-input-type',
  templateUrl: 'formFieldInputTypeComponent.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }] //permite ver el formgroupp
})
export class FormFieldInputTypeComponent {

  @Input() name: string; //nombre campo

  @Input() form: FormGroup; //formulario
  @Input() controlName: string; //nombre form control

  @Input() maxLength: number; //largo maximo
  @Input() required: boolean = false; //si es requerido

  @Input() autocomplete: 'on'; // on/off
  @Input() iconClass: string; //ccs icon class
  @Input() matIcon: string; // Icono a mostrar
  @Input() type: string; // Input type
  @Input() customIcon?: boolean = false;
  @Input() placeholder?: boolean = false;
  constructor(public i18nService: I18nService) {
  }
}
