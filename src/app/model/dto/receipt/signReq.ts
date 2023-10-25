/**
 * representa request para firmar recibo
 */
import {BaseDTO} from "@model/dto/baseDTO";

export interface SignReq extends BaseDTO {

  receipt:string;
  password:string;
  reason:string;
}
