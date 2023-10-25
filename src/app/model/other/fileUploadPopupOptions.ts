/**
 * opciones del popup de imagen
 */
export interface FileUploadPopupOptions {
  /**
   * indica si debe pedir el nombre de la imagen
   * por defecto es falso
   */
  showNameField?:boolean;

  /**
   * si solo acepta imagenes
   * por defecto es true
   */
  onlyImages?:boolean;

  /**
   * indica si debe mantener el ratio (Aplica solo si imagen)
   * por defecto es true
   */
  maintainAspectRatio?:boolean;

  /**
   * si debe ajustar el ancho de la imagen en px (Aplica solo si imagen)
   */
  resizeToWidth?:number;

  /**
   * si debe ajustar el alto de la imagen en px (Aplica solo si imagen)
   */
  resizeToHeight?:number;

  /**
   * si muestra el crop redondo (Aplica solo si imagen)
   * por defecto false
   */
  roundCropper?:boolean;
}
