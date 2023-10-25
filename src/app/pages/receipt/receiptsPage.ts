import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '@services/receiptService';
import { Receipt } from '@model/dto/receipt';
import { Pageable } from '@model/dto/pageable';
import { MatDialog } from '@angular/material/dialog';

import { ApiResponse } from '@model/dto/apiResponse';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { Constants } from '@utils/constants';
import { UtilService } from '@services/utilService';
import { Router } from '@angular/router';
import { Utils } from '@utils/utils';
import { SignaturePinPopup } from '@pages/receipt/popups/signaturePinPopup';

/**
 * Pagina mis recibos
 */
@Component({
  selector: 'receipts-page',
  templateUrl: './receiptsPage.html',
  styleUrls: ['./receiptsPage.css'],
})
export class ReceiptsPage extends OnDestroyMixin implements OnInit {
  hasDigitalSign: Promise<ApiResponse<boolean>>;
  receipts: Receipt[]; //lista de recibos recuperados
  loading: boolean = false; //flag de cargando
  more: boolean = true; //si hay mas paginas para pedir
  private request: Pageable = { page: 0, size: 100 }; //request TODO traer de 5 con el infite scroll
  receiptsFake = [];
  utils: any;

  //=============== constructor ===============

  /**
   * constructor
   * @param receiptService
   * @param dialog
   */
  constructor(
    private receiptService: ReceiptService,
    private dialog: MatDialog,
    private utilService: UtilService,
    private route: Router
  ) {
    super();
  }

  /**
   * inicializa pagina
   */
  ngOnInit(): void {
    this.utils = new Utils();
    this.hasDigitalSign = this.receiptService.hasDigitalSign();
    //recupero primera pagina de recibos
    this.getReceipts();
  }

  //=============== metodos privados ==============

  private getReceipts(): void {
    if (this.loading) return; //no vuelvo a pedir si ya hay uno en curso
    this.loading = true;
    this.receiptService
      .search(this.request)
      .then((response) => {
        if (response.status == 200) {
          //TODO para paginadothis.request.page++;
          this.more = response.data.page.length == this.request.size;
          //TODO paginado debe sumar y no reemplazar
          this.receipts = response.data.page;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  actionsReceipt(receipt) {
    let receiptStr = JSON.stringify(receipt);
    this.route.navigate(['/actions'], {
      queryParams: {
        receiptStr,
      },
      skipLocationChange: true,
    });
  }
  createDigitalSign(refreshPage: boolean) {
    this.dialog
      .open(SignaturePinPopup)
      .afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe((ok) => {
        if (ok && refreshPage) {
          this.hasDigitalSign = this.receiptService.hasDigitalSign();
          this.getReceipts();
        }
      });
  }
}
