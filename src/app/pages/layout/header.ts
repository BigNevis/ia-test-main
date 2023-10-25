import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { Constants } from '@utils/constants';
import { AuthService } from '@services/authService';
import { UtilService } from '@services/utilService';
import { PwaService } from '@services/pwaService';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {ConfigService} from "@services/configService";
/**
 * barra del header
 */
@Component({
  selector: 'layout-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header extends OnDestroyMixin implements OnInit {
  /**
   * barra latera
   */
  @Input() sidenav: MatSidenav;
  actualRoute: string;

  /**
   * constructor
   * @param authService
   * @param utilService
   * @param pwaService
   * @param _location
   * @param router
   */
  constructor(
    public authService: AuthService,
    private utilService: UtilService,
    public pwaService: PwaService,
    private _location: Location,
    private router: Router,
    public configService: ConfigService
  ) {
    super();
  }

  /**
   * init
   */
  ngOnInit() {
    this.getActualRoute();
  }

  //======================== metodos ======================

  /**
   * mostrar  / ocultar la barra
   */
  toggleSideBar(): void {
    this.sidenav.toggle().then();
  }

  /**
   * salir
   */
  async logout() {
    await this.authService.logout();
    this.utilService.navigate(Constants.URL.LOGIN);
  }
  backClicked() {
    // this._location.back();
    return this.utilService.navigate(Constants.URL.RECEIPTS, {
      skipLocationChange: true,
    });
  }
  getActualRoute() {
    //console.log("la ruta", this.router.url.split('?')[0]);
    return this.router.url.split('?')[0];
  }
}
