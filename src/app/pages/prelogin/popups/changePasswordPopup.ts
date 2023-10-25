import {Component, Inject, OnInit} from "@angular/core";
import {ReceiptService} from "@services/receiptService";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "@services/utilService";
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {CustomValidators} from "@utils/customValidators";
import {Constants} from "@utils/constants";
import {Utils} from "@utils/utils";
import {AuthService} from "@services/authService";

/**
 * Popup para crear firma
 */
@Component({
  selector: 'change-password-popup',
  templateUrl: './changePasswordPopup.html'
})
export class ChangePasswordPopup extends OnDestroyMixin implements OnInit {

  /**
   * form
   */
  public form: FormGroup;
  /**
   * string error
   */
  public error: string;
  /**
   * string user
   */
  private user: string;

 //=============== constructor ===============

  /**
   * constructor
   * @param dialog
   * @param fb
   * @param data
   * @param authService
   * @param utilService
   */
  constructor(private fb: FormBuilder, private dialog: MatDialogRef<ChangePasswordPopup>,
              @Inject(MAT_DIALOG_DATA) public data: any, private authService:AuthService, private utilService:UtilService) {
    super();
    this.user = data.user;
  }

  /**
   * inicializa pagina
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPassword2: ['', Validators.required]
    });

    //TODO: Ver con Damian si es mejor crear un CustomValidator
    this.error="";
    this.form.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe(()=>{
        if(this.form.controls['password'].value===this.form.controls['newPassword'].value) {
          this.form.markAsDirty();
          this.form.setErrors({});
          this.error = "La vieja y la nueva contraseña no pueden ser iguales";
        } else if(this.form.controls['newPassword'].value!==this.form.controls['newPassword2'].value &&
          (this.form.controls['newPassword'].touched || this.form.controls['newPassword2'].touched)) {
            this.form.markAsDirty();
            this.form.setErrors({});
            this.error = "La contraseña y su confirmación deben iguales";
        }else{
          this.form.markAsPristine();
          this.error="";
        }
      });
  }

  //=================== metodos =========================

  /**
   * actualiza la contraseña y login
   */
  confirm() {
    return this.authService.login(this.user, this.form.controls.password.value, this.form.controls.newPassword.value).then(response=>{
      if (response.status==200) {
        this.dialog.close(true);
        this.utilService.showSnack("La Contraseña se ha actualizado correctamente.");
      }
    })
  }

  cancel():void{
    this.dialog.close(false);
  }
}
