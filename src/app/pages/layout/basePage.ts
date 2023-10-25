import {Component, HostListener} from '@angular/core';
import {AuthService} from "@services/authService";
import {OnDestroyMixin} from "@w11k/ngx-componentdestroyed";
import {PopupService} from "@services/popupService";
import {UserService} from "@services/userService";
import {PwaService} from "@services/pwaService";
import {IconRegistry} from "@utils/iconRegistry";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

/**
 * Pagina base y layout
 */
@Component({
  selector: 'app-root',
  templateUrl: './basePage.html',
  styleUrls: ['./basePage.css']
})
export class BasePage extends OnDestroyMixin {

  constructor(public authService:AuthService, private router:Router,
              private pwaService:PwaService, private popupService: PopupService, private userService: UserService,
              private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    super();
    pwaService.checkForUpdate();
    IconRegistry.registryCustomIcons(matIconRegistry, domSanitizer);
  }

  /**
   * evento para capturar el install de pwa
   * @param event
   */
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event) {
    this.pwaService.setInstallDeferredPrompt(event);
  }

  getActualRoute() {
    //console.log("la ruta", this.router.url.split('?')[0]);
    return this.router.url.split('?')[0];
  }
}
