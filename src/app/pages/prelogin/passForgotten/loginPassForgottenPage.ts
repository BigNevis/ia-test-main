import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AuthService} from "@services/authService";
import {UtilService} from "@services/utilService";
import {Constants} from "@utils/constants";
import {Utils} from "@utils/utils";
import {MatDialog} from "@angular/material/dialog";
import {ConfigService} from "@services/configService";


/**
 * Pagina de login
 */
@Component({
  selector: 'login-pass-forgotten-page',
  templateUrl: './loginPassForgottenPage.html',
  styles: ['::ng-deep #btnReset .mat-raised-button{background: #ffb600 !important; color: #373a36; font-weight:400}']
})
export class LoginPassForgottenPage extends OnDestroyMixin implements OnInit {
  /**
   * form
    */
  public form: FormGroup;
  /**
   * string error
   */
  public error: string;
  /**
   * boolean success
   */
  public success: boolean;

  //=================== Constructor =====================

  /**
   * constructor
   * @param configService
   * @param fb
   * @param authService
   * @param utilService
   * @param dialog
   */
  constructor(public configService: ConfigService,
              private fb: FormBuilder, private authService:AuthService,
              private utilService: UtilService, private dialog: MatDialog) {
    super();
    this.success=false;
  }

  /**
   * init
   */
  ngOnInit(){
    //usuario no logueado, termino de construir la pagina
    this.form = this.fb.group({
      userMail: ['', [Validators.required, Validators.maxLength(120)]]
    });
    this.form.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe((val)=>{
        this.error="";//clean error message
      });
    //chequeo si ya estoy logueado
    if (this.authService.isLogged()) {
      this.enter();
    } else {
      sessionStorage.clear();
    }
  }

  //================== Methods ===================

  /**
   * envio de mail para recupero de contraseña
   */
  recoverPassword():Promise<any>{
    this.error=null;
    let mail = Utils.validateEmail(this.form.controls.userMail.value) ? this.form.controls.userMail.value : null;
    let user = mail == null ? this.form.controls.userMail.value : null;
    return this.authService.recoverPassword(user, mail)
      .then(response=> {//process response
        switch(response.status) {
          case 200:
            this.success=true;
            break;
          case 400:
            this.success=false;
            this.error = "El usuario o correo idicado no corresponde a un empleado registrado. Vuelva a ingresar el mismo o contacte al Administrador.";
            break;
        }
      })
  }

  /**
   * ir a pagina de login
   */
  loginPage() {
    this.utilService.navigate(Constants.URL.LOGIN);
  }

  /**
   * ingresa a pagina principal
   */
  private enter(){
     this.utilService.navigate(Constants.URL.RECEIPTS);
  }
}
