import {Component, OnInit} from "@angular/core";
import {ReceiptService} from "@services/receiptService";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "@services/utilService";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CustomValidators} from "@utils/customValidators";

/**
 * Popup para crear firma
 */
@Component({
  selector: 'signature-pin-popup',
  templateUrl: './signaturePinPopup.html',
  styles: ['::ng-deep #btnConfirm .mat-button-wrapper {color: #fff !important}']
})
export class SignaturePinPopup extends OnDestroyMixin implements OnInit {

  /**
   * form
   */
  public form: FormGroup;

  public error: string;

 //=============== constructor ===============

  /**
   * constructor
   * @param receiptService
   * @param dialog
   * @param fb
   * @param utilService
   */
  constructor(private receiptService:ReceiptService, private dialog: MatDialogRef<SignaturePinPopup>, private fb: FormBuilder,
              private utilService:UtilService) {
    super();
  }

  /**
   * inicializa pagina
   */
  ngOnInit(): void {
    const validator=[Validators.required, CustomValidators.numeric, Validators.minLength(4), Validators.maxLength(4)]
    this.form = this.fb.group({
      password: ['', validator],
      password2: ['', validator]
    });

    //TODO: Ver con Damian si es mejor crear un CustomValidator
    this.error="";
    this.form.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe(()=>{
        if(this.form.controls['password'].value!==this.form.controls['password2'].value) {
          if(this.form.controls['password'].touched || this.form.controls['password2'].touched) {
            this.form.markAsDirty();
            this.form.setErrors({});
            this.error = "PIN y su confirmación deben iguales";
          }
        }else{
          this.form.markAsPristine();
          this.error="";
        }
      });
  }

  //=================== metodos =========================

  /**
   * crea firma digital
   */
  async confirm() {
    return await this.receiptService.createDigitalSign(this.form.get("password").value).then(response=>{
      if (response.status==200) {
        this.dialog.close(true);
        this.utilService.showSnack("La Firma Digital se ha creado correctamente.");
      }
    })
  }

  cancel():void{
    this.dialog.close(false);
  }
}
