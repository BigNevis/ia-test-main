import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AuthService} from "@services/authService";
import {UtilService} from "@services/utilService";
import {Constants} from "@utils/constants";
import {Utils} from "@utils/utils";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordPopup} from "@pages/prelogin/popups/changePasswordPopup";
import {ConfigService} from "@services/configService";

/**
 * Pagina de login
 */
@Component({
  selector: 'login-page',
  templateUrl: './loginPage.html',
  styleUrls: ['./loginPage.css']
})
export class LoginPage extends OnDestroyMixin implements OnInit {
  /**
   * form
    */
  public form: FormGroup;
  /**
   * string error
   */
  public error: string;

  //=================== Constructor =====================

  /**
   * constructor
   * @param fb
   * @param authService
   * @param utilService
   * @param dialog
   */
  constructor(public configService: ConfigService,
              private fb: FormBuilder, private authService:AuthService,
              private utilService: UtilService, private dialog: MatDialog) {
    super();
  }

  /**
   * init
   */
  ngOnInit(){
    //usuario no logueado, termino de construir la pagina
    this.form = this.fb.group({
      user: [localStorage.getItem(Constants.LOCAL_STORE.REMEMBER), [Validators.required, Validators.maxLength(100)]],
      password: ['', Validators.required],
      rememberMe: [localStorage.getItem(Constants.LOCAL_STORE.REMEMBER)!=null]
    });
    this.form.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe((val)=>{
        this.error="";//clean error message
        if (val.rememberMe==false)
          localStorage.removeItem(Constants.LOCAL_STORE.REMEMBER);
      });
    //chequeo si ya estoy loegueado
    if (this.authService.isLogged()) {
      this.enter();
    } else {
      sessionStorage.clear();
    }
  }

  //================== Methods ===================

  /**
   * login
   */
  login():Promise<any>{
    this.error=null;
    return this.authService.login(this.form.controls.user.value,this.form.controls.password.value)
      .then(response=> {//process response
        switch(response.status) {
          case 200:
            if (this.form.controls.rememberMe.value==true)
              localStorage.setItem(Constants.LOCAL_STORE.REMEMBER,this.form.controls.user.value);
            this.enter();
            break;
          case 400:
            Utils.cleanFormControl(this.form.controls.password);
            this.error = "Sus credenciales son incorrectas. Vuelva a ingresar las mismas o contacte al Administrador.";
            break;
          case 403:
            Utils.cleanFormControl(this.form.controls.password);
            this.error = "Sus credenciales expiraron. Por favor, actualícelas e inténtelo nuevamente.";
            this.dialog.open(ChangePasswordPopup, { data: { user: this.form.controls.user.value } }).afterClosed()
              .pipe(untilComponentDestroyed(this))
              .subscribe(ok=>{
                if (ok) {
                  if (this.form.controls.rememberMe.value == true)
                    localStorage.setItem(Constants.LOCAL_STORE.REMEMBER, this.form.controls.user.value);
                  this.enter();
                }
              });
            break;
        }
      })
  }

  /**
   * contraseña olvidada
   */
  passForgotten() {
    this.utilService.navigate(Constants.URL.LOGIN_PASS_FORGOTTEN);
  }

  /**
   * ingresa a pagina principal
   */
  private enter(){
    //this.utilService.navigate(Constants.URL.HOME);
    this.utilService.navigate(Constants.URL.RECEIPTS);
  }
}
