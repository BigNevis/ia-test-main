import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {UtilService} from "@services/utilService";

/**
 * GlobalErrorHandler
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
   * constructor
   * @param injector
   */
  constructor(private injector: Injector){
  }

  /**
   * handleError
   * @param error
   */
  handleError(error) {
    console.error(error);
    const utilService:UtilService = this.injector.get<UtilService>(UtilService);
    //muestro error
    utilService.showSnack("No se ha podido completar la operación. Intente nuevamente o contacte con el Administrador.");
    //envio error al server
    utilService.sendError(error.message?error.message:error, error.stack);
  }
}
