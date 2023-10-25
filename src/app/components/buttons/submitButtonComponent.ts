import {Component, Input} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";

/**
 * btn submit (incluye cargando)
 */
@Component({
  selector: 'submit-button',
  templateUrl: 'submitButtonComponent.html'
})
export class SubmitButtonComponent {

  /**
   * deshabilitado
   */
  @Input() disabled:boolean;
  /**
   * color
   */
  @Input() color: ThemePalette="accent";
  /**
   * onclick
   */
  @Input() click:()=>Promise<any>;

  loading:boolean=false; //cargando

  //==================== constructor =====================

  /**
   * constructor
   */
  constructor() {
  }

  //================== metodos ====================

  /**
   * btn clic
   */
  clickAction(){
    if (this.loading)
      return;
    else
      this.loading=true;
    const promise=this.click();
    if (promise)
      promise.finally(()=>{this.loading=false});
    else
      this.loading=false;
  }

}
