import {Component, Inject, OnInit} from "@angular/core";
import {ReceiptService} from "@services/receiptService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "@services/utilService";
import {Receipt} from "@model/dto/receipt";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CustomValidators} from "@utils/customValidators";
import {I18nService} from "@services/i18nService";
import {PopupData} from "@pages/receipt/popups/PopupData";

/**
 * Popup para firmar
 */
@Component({
  selector: 'sign-popup',
  templateUrl: './signPopup.html'
})
export class SignPopup extends OnDestroyMixin implements OnInit {

  /**
   * form
   */
  public form: FormGroup;

  private happy: boolean=true;

 //=============== constructor ===============

  /**
   * constructor
   * @param receiptService
   * @param dialog
   * @param fb
   * @param utilService
   * @param data
   * @param i18nService
   */
  constructor(private receiptService:ReceiptService, private dialog: MatDialogRef<SignPopup>, private fb: FormBuilder,
              private utilService:UtilService, @Inject(MAT_DIALOG_DATA) public data: PopupData, public i18nService: I18nService) {
    super();
  }

  /**
   * inicializa pagina
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      agree:['', Validators.required],
      reason:[null, [Validators.maxLength(120), CustomValidators.alphanumericSymbols,
                     CustomValidators.requiredIf(() => this.isDisagree())]],
      password: ['', [Validators.required, CustomValidators.numeric, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.form.get("agree").valueChanges.pipe(untilComponentDestroyed(this))
      .subscribe((val)=>{
        this.form.get('reason').patchValue(null);
      });
  }

  //=================== metodos =========================

  /**
   * crea firma digital
   */
  confirm() {
    return this.receiptService.sign({
      receipt:this.data.dto.id,
      reason:this.form.get("reason").value,
      password:this.form.get("password").value
    }).then(response=>{
        if (response?.status==200) {
          this.dialog.close(true);
          this.utilService.showSnack("Recibo firmado.");
        }
    })
  }

  cancel():void{
    this.dialog.close(false);
  }

  isDisagree(): boolean {
    return "false"==this.form.get("agree").value;
  }

  resetDigitalSign() {
    this.dialog.close(false);
    this.data.functionToCall();
  }
}
