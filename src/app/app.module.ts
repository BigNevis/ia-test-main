import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import {MaterialModule} from "./material.module";
import {RoutingModule} from "./routing.module";
import {BasePage} from "@pages/layout/basePage";
import {LoadingPage} from "@pages/prelogin/loadingPage";
import {LoginPage} from "@pages/prelogin/loginPage";
import {ChangePasswordPopup} from "@pages/prelogin/popups/changePasswordPopup";
import {LoginPassForgottenPage} from "@pages/prelogin/passForgotten/loginPassForgottenPage"
import {GlobalErrorHandler} from "@utils/globalErrorHandler";
import {Header} from "@pages/layout/header";
import {SubmitButtonComponent} from "@components/buttons/submitButtonComponent";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FormFieldInputTypeComponent} from "@components/forms/formFieldInputTypeComponent";
import {ServicesModule} from "./services.module";
import {ReceiptsPage} from "@pages/receipt/receiptsPage";
import {SignaturePinPopup} from "@pages/receipt/popups/signaturePinPopup";
import {DisagreePopup} from "@pages/receipt/popups/disagreePopup";
import {SignPopup} from "@pages/receipt/popups/signPopup";
import {FormTextFieldComponent} from "@components/forms/formTextFieldComponent";
import {ImageButtonComponent} from "@components/buttons/imageButtonComponent";
import {FileUploadPopup} from "@components/popups/fileUploadPopup";
import {ImageCropperModule} from "ngx-image-cropper";
import {FormRowComponent} from "@components/forms/formRowComponent";
import {FormFieldComponent} from "@components/forms/formFieldComponent";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from '@pages/home/home.component';
import { Footer } from '@pages/layout/footer';
import { ActionsComponent } from '@pages/receipt/actions/actions.component';
import { SignComponent } from '@pages/receipt/sign/sign.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import {ConfigService} from "@services/configService";

/**
 * init app
 */
export function appInit(configService:ConfigService) {
  return () => {
    //seteo el tema
    configService.setTheme()}
}

@NgModule({
    declarations: [
        //--- directivas ---
        //---- componentes----
        BasePage, Header, Footer,
        SubmitButtonComponent, ImageButtonComponent,
        FormRowComponent, FormFieldComponent, FormFieldInputTypeComponent, FormTextFieldComponent,
        //--- popups comunes ----
        FileUploadPopup,
        //--- paginas ----
        LoadingPage, LoginPage, ChangePasswordPopup, LoginPassForgottenPage,
        ReceiptsPage, SignaturePinPopup, SignPopup, DisagreePopup,
        HomeComponent,
        ActionsComponent,
        SignComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        RoutingModule,       //modulo rutas
        ReactiveFormsModule, //modulo formularios reactivos
        ServicesModule,     //modulo servicios
        MaterialModule,     //modulo angular material
        HttpClientModule, //modulo http
        ServiceWorkerModule.register('ngsw-worker.js', { //service  worker
            enabled: environment.production,
            registrationStrategy: 'registerImmediately'
        }),
        //otras libs
        ImageCropperModule, //crop de imagenes https://github.com/Mawi137/ngx-image-cropper
    ],
    providers: [
        {provide: ErrorHandler, useClass: GlobalErrorHandler}, //manejo de errores
        {
            provide: APP_INITIALIZER, useFactory: appInit, multi: true, deps: [ConfigService] //inicia el servicio de configuracion
        }
    ],
    exports: [
        FormRowComponent,
        FormFieldComponent
    ],
    bootstrap: [BasePage]
})
export class AppModule { }
