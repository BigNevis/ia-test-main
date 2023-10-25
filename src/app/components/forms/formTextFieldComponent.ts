import {Component, Input} from '@angular/core';
import {Utils} from 'src/app/utils/utils';
import {ControlContainer, FormGroup, FormGroupDirective} from "@angular/forms";
import {I18nService} from "@services/i18nService";

@Component({
  selector: 'form-text-field',
  templateUrl: 'formTextFieldComponent.html',
  viewProviders:[{provide:ControlContainer, useExisting:FormGroupDirective}] //permite ver el formgroupp
})
export class FormTextFieldComponent {

  public Utils=Utils;

  @Input() name:string; //nombre campo
  @Input() description:string; //descripcion

  @Input() form:FormGroup; //formulario
  @Input() controlName:string; //nombre form control

  @Input() maxLength:number; //largo maximo
  @Input() required:boolean=false; //si es requerido

  constructor(public i18nService:I18nService){
  }
}
