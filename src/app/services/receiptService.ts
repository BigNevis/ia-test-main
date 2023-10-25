import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApiResponse} from "@model/dto/apiResponse";
import {Pageable} from "@model/dto/pageable";
import {Page} from "@model/dto/page";
import {Receipt} from "@model/dto/receipt";
import {Observable} from "rxjs";
import {Utils} from "@utils/utils";
import {SignReq} from "@model/dto/receipt/signReq";

/**
 * Servicio de recibos de empleado
 */
@Injectable()
export class ReceiptService {

  private readonly baseUrl:string="myreceipt/"; //url base

  /**
   * si tiene firma digital el usuario
   */
  private digitalSign:Promise<ApiResponse<boolean>>;

  //===================== constructor =================================

  /**
   * constructor
   */
  constructor(private http: HttpClient) {
  }

  //===================== methods ======================

  /**
   * limpia los datos de usuario del servicio
   */
  clear(){
    this.digitalSign=null;
  }

  /**
   * devuelve si tiene firma digital valida
   */
  hasDigitalSign():Promise<ApiResponse<boolean>> {
    if (this.digitalSign==null)
      this.digitalSign = this.http.get<ApiResponse<boolean>>(this.baseUrl + "sign").toPromise()
    return this.digitalSign;
  }

  /**
   * crear la firma digital
   * @param password
   */
  createDigitalSign(password:string):Promise<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(this.baseUrl+"sign",{password: password}).toPromise()
      .then(response=>{
        if (response.status==200) {//si puede crear la firma, vuelvo a validar que este ok
          this.digitalSign=null;
          this.hasDigitalSign().then();
        }
        return response;
      });
  }

  /**
   * firma un recibo
   * @param request
   */
  sign(request:SignReq){
    return this.http.post<ApiResponse<null>>(this.baseUrl+request.receipt+"/sign",request).toPromise();
  }

  /**
   * busqueda que devuelve promise
   * @param pageable
   */
  search(pageable:Pageable):Promise<ApiResponse<Page<Receipt>>> {
    return this.searchObservable(pageable).toPromise()
  }

  /**
   * busqueda, que devuelve observable
   * @param pageable
   */
  searchObservable(pageable:Pageable):Observable<ApiResponse<Page<Receipt>>> {
    return this.http.get<ApiResponse<Page<Receipt>>>(this.baseUrl,{
      params: Utils.convertPagebale(pageable)
    })
  }

  /**
   * descarga un recibo
   * @param receipt recibo
   */
  downloadReceipt(receipt:Receipt):void {
    this.http.get<HttpResponse<Blob>>(this.baseUrl+receipt.id, {observe: 'response',responseType:"blob" as "json"})
      .toPromise().then(result=>{
        if (result)
          Utils.downloadFile(result.headers.get("name"), URL.createObjectURL(new Blob([result.body as any])));
      });
  }

  /**
   * abre un recibo
   * @param receipt recibo
   */
   openReceipt(receipt:Receipt):void {
      this.http.get<Blob>(this.baseUrl+receipt.id, {responseType:"blob" as "json"}).toPromise().then(result=>{
        if (result)
          window.open(URL.createObjectURL(result), '_blank');
        });
    }


}
