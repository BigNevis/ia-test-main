import {Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FileUploadPopup} from "@components/popups/fileUploadPopup";
import {FileUploadPopupOptions} from "@model/other/fileUploadPopupOptions";

/**
 * Servicio de popups
 */
@Injectable()
export class PopupService {

  /**
   * constructor
   */
  constructor(private dialog: MatDialog) {
  }

  //===================== methods =================

  /**
   * muestra un popup generico de confirmación
   * @param text
   *
  showConfirmationPopup(text:string):MatDialogRef<ConfirmationPopup> {
    return this.dialog.open(ConfirmationPopup, {
      data: text,
      autoFocus:false //sin foco en ningun btn
    });
  }
  */

  /**
   * muestra un popup para adjuntar archivos
   * @param options
   */
  showFileUploadPopup(options?:FileUploadPopupOptions):MatDialogRef<FileUploadPopup> {
    return this.dialog.open(FileUploadPopup, {
      data: options||{}
    });
  }

  /**
   * cierra todos los popups
   */
  closeAll(){
    this.dialog.closeAll();
  }

}
