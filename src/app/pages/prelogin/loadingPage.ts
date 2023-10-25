import {Component, OnInit} from '@angular/core';
import {AuthService} from "@services/authService";
import {UtilService} from "@services/utilService";
import {Constants} from "@utils/constants";

/**
 * Pagina de login
 */
@Component({
  selector: 'loading-page',
  templateUrl: './loadingPage.html'
})
export class LoadingPage implements OnInit{

  //=================== Constructor =====================
  /**
   * constructor
   * @param authService
   * @param utilService
   */
  constructor(private authService:AuthService, private utilService:UtilService) {
  }

  /**
   * init
   */
  ngOnInit(): void {
    this.load();
  }

  //================== metodos  ===================

  /**
   * load
   */
  private load():void{
    this.authService.login().then(response=> {
      if (response.status==401 || (response.status==200 && response.data))
        this.utilService.navigate(Constants.URL.LOGIN);
      else {
        setTimeout(()=>this.load(),10*1000);
      }
    });
  }

}
