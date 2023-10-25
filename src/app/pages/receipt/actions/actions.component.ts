import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt } from '../../../model/dto/receipt';
import { ReceiptService } from '@services/receiptService';
import { DisagreePopup } from '@pages/receipt/popups/disagreePopup';
import { MatDialog } from '@angular/material/dialog';
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { SignPopup } from '@pages/receipt/popups/signPopup';
import { PopupData } from '@pages/receipt/popups/PopupData';
import { SignaturePinPopup } from '@pages/receipt/popups/signaturePinPopup';
import { ApiResponse } from '@model/dto/apiResponse';
import { Constants } from "@utils/constants";
import { Utils } from '../../../utils/utils';
import { utils } from 'protractor';



@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent extends OnDestroyMixin implements OnInit {
  hasDigitalSign: Promise<ApiResponse<boolean>>;
  receipt: any;
  utils: Utils;
  constructor(private route: ActivatedRoute, private receiptService: ReceiptService, private dialog: MatDialog, private _route: Router) {
    super();
    this.receipt = JSON.parse(this.route.snapshot.queryParams.receiptStr);
  }

  ngOnInit(): void {
    this.utils = new Utils();
    this.hasDigitalSign = this.receiptService.hasDigitalSign();
  }
  open(receipt: Receipt) {

    this.receiptService.openReceipt(receipt);
  }
  download(receipt: Receipt) {
    this.receiptService.downloadReceipt(receipt);
  }
  createDigitalSign(refreshPage: boolean) {
    this.dialog.open(SignaturePinPopup).afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe(ok => {
        if (ok && refreshPage) {
          this.hasDigitalSign = this.receiptService.hasDigitalSign();
          console.log(this.hasDigitalSign);
        }
      });
  }
  sign(receipt: Receipt) {
    const popupData: PopupData = { dto: receipt, functionToCall: this.createDigitalSign.bind(this, false) };
    this.dialog.open(SignPopup, { data: popupData }).afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe(ok => {
        if (ok) receipt.signed = new Date();
      });
  }
  showDisagree(receipt: Receipt) {
    this.dialog.open(DisagreePopup, { data: { dto: receipt } }).afterClosed()
      .pipe(untilComponentDestroyed(this));
  }
  signReceipt(receipt) {
    let receiptStr = JSON.stringify(receipt);
    this._route.navigate([Constants.URL.SIGN], {
      queryParams: {
        receiptStr
      },
      skipLocationChange: true
    });
  }
}
