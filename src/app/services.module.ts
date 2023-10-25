import {NgModule} from "@angular/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ApiHttpInterceptor} from "@utils/apiHttpInterceptor";
import {UtilService} from "@services/utilService";
import {I18nService} from "@services/i18nService";
import {AuthService} from "@services/authService";
import {DirectAccessGuard} from "@utils/routing/directAccessGuard";
import {ReceiptService} from "@services/receiptService";
import {PopupService} from "@services/popupService";
import {UserService} from "@services/userService";
import {PwaService} from "@services/pwaService";
import {ConfigService} from "@services/configService";


/**
 * modulo de servicios
 */
@NgModule({
  imports: [
    MatSnackBarModule
  ],
  declarations: [
  ],
  providers:[{
      provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true
    },
    // servicios utilidades
    UtilService, I18nService, PopupService, PwaService, ConfigService,
    // servicios navegacion
    DirectAccessGuard,
    // servicios funcionalies
    AuthService, UserService, ReceiptService,
  ]
})
export class ServicesModule {
}
