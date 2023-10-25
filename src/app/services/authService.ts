import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "@model/dto/user";
import {ApiResponse} from "@model/dto/apiResponse";
import {ReceiptService} from "@services/receiptService";
import {FileAttach} from "@model/dto/fileAttach";
import {PopupService} from "@services/popupService";

/**
 * Servicio de authenticacion
 */
@Injectable()
export class AuthService {

  private baseUrl:string="auth/"; //url base
  private user:User; //usuario logueado

  //===================== constructor =================================

  /**
   * constructor
   */
  constructor(private http: HttpClient, private receiptService:ReceiptService,
              private popupService:PopupService) {
  }

  //===================== methods ======================

  /**
   * login
   * @param user
   * @param password
   */
  login(user?:string, password?:string, newPassword?:string):Promise<ApiResponse<User>> {
    return new Promise((resolve) =>  {
      let promise:Promise<ApiResponse<User>>;
      if (user && password) //me estoy logueando
        promise=this.http.post<ApiResponse<User>>(this.baseUrl + "login", {user: user, password: password, newPassword: newPassword}).toPromise();
      else //valido si ya tengo sesion activa en el server
        promise=this.http.get<ApiResponse<User>>(this.baseUrl + "login").toPromise();
      //proceso respuesta
      promise.then(response => {
        if (response.status == 200)
          this.user = response.data; //guardo el usuario
        resolve(response);
      });
    });
  }

  /**
   * devuelve si el usuario esta logueado
   * @returns {boolean}
   */
  isLogged():boolean{
    return this.user!=null;
  }

  /**
   * logout
   */
  async logout():Promise<ApiResponse<null>>{
    return new Promise((resolve) =>  {
      this.http.get<ApiResponse<null>>(this.baseUrl + "logout").toPromise()
        .then(response=> {
          if (response.status == 200) this.cleanSession();
          resolve(response);
        });
    })
  }

  /**
   * recupero de password de un usuario
   * @param user
   * @param mail
   */
  recoverPassword(user?:string, mail?: string):Promise<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.baseUrl + "recoverPassword", {user: user, mail: mail}).toPromise();
  }

  /**
   * devuelve el usuario
   */
  getUser():User {
    return this.user;
  }

  /**
   * limpia la sesion del usuario
   */
  cleanSession(){
    this.popupService.closeAll();
    this.user=null;
    sessionStorage.clear();
    this.receiptService.clear();
  }

  updatePhoto(photo: FileAttach) {
    this.user.photo = photo;
  }

}
