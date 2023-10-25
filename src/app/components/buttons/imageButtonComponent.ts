import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * btn con imagen
 */
@Component({
  selector: 'image-button',
  templateUrl: 'imageButtonComponent.html'
})
export class ImageButtonComponent {

  /**
   * tooltip
   */
  @Input() tooltip:string;
  /**
   * src de la imagen
   */
  @Input() src:string;
  /**
   * ancho de la imagen
   */
  @Input() width:string;
  /**
   * alto de la imagen
   */
  @Input() height:string;
  /**
   * indica si es redonda o no, por defecto no lo es
   */
  @Input() round:boolean=false;
  /**
   * evento onClick
   */
  @Output() onClick = new EventEmitter<number>();

  constructor() {
  }

//================== metodos ====================

  /**
   * click
   */
  click(){
    this.onClick.emit();
  }

}
