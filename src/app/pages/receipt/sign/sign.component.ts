import { Component, OnInit } from '@angular/core';
import { Utils } from '../../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '@services/utilService';
import { I18nService } from '@services/i18nService';
import { CustomValidators } from '@utils/customValidators';
import { ReceiptService } from '@services/receiptService';
import { ApiResponse } from '@model/dto/apiResponse';
import { untilComponentDestroyed, OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { MatDialog } from '@angular/material/dialog';
import { SignaturePinPopup } from '@pages/receipt/popups/signaturePinPopup';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent extends OnDestroyMixin implements OnInit {
  hasDigitalSign: Promise<ApiResponse<boolean>>;
  utils: Utils;
  receipt: any;
  form: FormGroup;
  required: boolean = false;
  private happy: boolean = true;
  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private fb: FormBuilder,
    private utilService: UtilService, public i18nService: I18nService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.receipt = JSON.parse(this.route.snapshot.queryParams.receiptStr);
    this.utils = new Utils();

    this.form = this.fb.group({
      agree: ['', Validators.required],
      reason: [null],
      password: ['', [Validators.required, CustomValidators.numeric, Validators.minLength(4), Validators.maxLength(4)]]
    });

  }
  isDisagree(): boolean { 
    return "false" == this.form.get("agree").value;
  }
  confirm() {
    return this.receiptService.sign({
      receipt: this.receipt.id,
      reason: this.form.get("reason").value,
      password: this.form.get("password").value
    }).then(response => {
      if (response?.status == 200) {
        //this.hasDigitalSign = this.receiptService.hasDigitalSign();
        this.receipt.signed = new Date();
        this.utilService.showSnack("Recibo firmado.");
      }
    })
  }
  // para crear firma digitial 
  createDigitalSign(refreshPage: boolean = true) {
    this.dialog.open(SignaturePinPopup).afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe(ok => {
        if (ok && refreshPage) {
          this.hasDigitalSign = this.receiptService.hasDigitalSign();
          console.log(this.hasDigitalSign);
        }
      });
  }

  agreeChange(event){
    if(event.value == "true"){
      this.required = false;
      this.form.controls.reason.removeValidators(Validators.required);
      this.form.controls.reason.setValue('')
    }
    else {
      this.required = true;
      this.form.controls.reason.setValidators([Validators.maxLength(120), CustomValidators.alphanumericSymbols,Validators.required]);
    }
  }
}
