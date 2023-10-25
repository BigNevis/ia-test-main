import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators} from "@angular/forms";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CustomValidators} from "@utils/customValidators";
import {PopupData} from "@pages/receipt/popups/PopupData";

/**
 * Popup para firmar
 */
@Component({
  selector: 'disagree-popup',
  templateUrl: './disagreePopup.html'
})
export class DisagreePopup extends OnDestroyMixin implements OnInit {

  /**
   * form
   */
  public form: FormGroup;

  private happy: boolean=true;

 //=============== constructor ===============

  /**
   * constructor
   * @param dialog
   * @param data
   */
  constructor(private dialog: MatDialogRef<DisagreePopup>, @Inject(MAT_DIALOG_DATA) public data: PopupData) {
    super();
  }

  /**
   * inicializa pagina
   */
  ngOnInit(): void {
  }

  //=================== metodos =========================

  close():void{
    this.dialog.close();
  }

}
