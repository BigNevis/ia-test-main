import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "@model/dto/apiResponse";
import {FileAttach} from "@model/dto/fileAttach";
import {AuthService} from "./authService";

/**
 * Servicio Usuario
 */
@Injectable()
export class UserService {
  /**
   * url base
   */
  protected baseUrl:string="users/";

  //===================== constructor =================================

  /**
   * constructor
   */
  constructor(protected http: HttpClient, private authService: AuthService) {
  }

  //===================== methods ======================

  /**
   * guarda imagen del usuario
   * @param photo
   */
  saveUserPhoto(photo: FileAttach): Promise<ApiResponse<any>> {
    return this.http.post<ApiResponse<string>>(this.baseUrl+"photo", photo).toPromise()
      .then(result => {
        if(result.status == 200) {
          photo.id=result.data;
          this.authService.updatePhoto(photo);
        }
        return result;
      });
  }
}
