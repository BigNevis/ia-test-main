/**
 * respuesta
 */
import {BaseDTO} from "./baseDTO";

export interface ApiResponse<T> extends BaseDTO{
  status: number;
  message?: string;
  data?: T
}
