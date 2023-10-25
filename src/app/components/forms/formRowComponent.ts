import {Component, Input} from '@angular/core';

/**
 * representa una fila en los formularios
 */
@Component({
  selector: 'form-row',
  templateUrl: 'formRowComponent.html'
})
export class FormRowComponent {
  /**
   * indica el alignment en la fila
   */
  @Input() align:string="none center";

}
