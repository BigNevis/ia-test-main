/**
 * DTO de solicitud de una pagina de resultado
 */
import {BaseDTO} from "./baseDTO";

export interface Pageable extends BaseDTO{
  page:number;
  size:number;
}
