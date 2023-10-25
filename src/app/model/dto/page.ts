/**
 * pagina de resultado
 */
import {BaseDTO} from "./baseDTO";

export interface Page<T> extends BaseDTO{
  totaElements:number;
  page:T[];
}
