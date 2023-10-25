import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "@model/dto/apiResponse";

/**
 * Servicio de utilidades
 */
@Injectable()
export class UtilService {

  /**
   * constructor
   */
  constructor(private router: Router, private snackBar: MatSnackBar,
              private http: HttpClient) {
  }

  //===================== methods =================

  /**
   * navega a una pagina async
   * @param url
   * @param data
   */
  navigate(url:string, data?:any):void{
    this.router.navigate(["/"+url], {
      skipLocationChange: true,
      state: data
    }).then();
  }

  /**
   * muestra mensaje por snackbar
   * @param text
   * @param time
   */
  showSnack(text:string, time?:number){
    return this.snackBar.open(text, "OK",{
      duration: time?time:3000,
      verticalPosition:"top",
      horizontalPosition:"right",
      panelClass:["snack"]
    });
  }

  /**
   * envia error al server
   * @param message
   * @param stack
   */
  sendError(message:string, stack:string) {
    this.http.post<ApiResponse<any>>("utils/error", {message: message, stack: stack}).toPromise().then();
  }

}
