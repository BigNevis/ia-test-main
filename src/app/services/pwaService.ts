import {ApplicationRef, Injectable} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {UtilService} from "./utilService";
import {interval} from "rxjs";

/**
 * Servicio PWA
 * https://angular.io/api/service-worker/SwPush
 */
@Injectable()
export class PwaService extends OnDestroyMixin {

  /**
   * browser prompt
   */
  private installDeferredPrompt:any;

  /**
   * constructor
   * @param appRef
   * @param http
   * @param swUpdate
   * @param utilService
   * @param swPush
   * @param gaService
   */
  constructor(private appRef: ApplicationRef, private utilService: UtilService, private swUpdate: SwUpdate) {
    super();
    //evento para cuando hay nueva version
    swUpdate.available.pipe(untilComponentDestroyed(this)).subscribe(() => {
      const snack=utilService.showSnack("Hay una nueva versión de la App disponible. Haga clic ok para descargar la misma.",10000);
      snack.onAction().pipe(untilComponentDestroyed(this)).subscribe(()=>{
        swUpdate.activateUpdate().then(() => document.location.reload());
      });
    });

    //chequear cada 4hs por nueva version
    interval(1000 * 60 * 60 * 4).pipe(untilComponentDestroyed(this)).subscribe(() => this.checkForUpdate());

  }

  //======================= metodos =====================

  /**
   * valida si hay nueva version
   */
  checkForUpdate(){
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then();
    }
  }

  /**
   * valida si se puede instalar la app
   */
  isInstallable():boolean{
    return (this.installDeferredPrompt!=null);
  }

  /**
   * instala la app
   */
  install(){
    this.installDeferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.installDeferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          //this.gaService.event({ category:GaCategory.PORTAL,action:GaAction.PWA_INSTALL});
          this.installDeferredPrompt = null;
        }
      });
  }

  /**
   * setea el promp para dsp poder invocarlo
   * @param event
   */
  setInstallDeferredPrompt(event:any){
    event.preventDefault(); //
    this.installDeferredPrompt=event;
  }

}
