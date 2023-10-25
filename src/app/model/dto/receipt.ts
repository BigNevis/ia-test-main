import {BaseIdDTO} from "./baseIdDTO";
import {CompanyName} from "@model/enum/companyName";

/**
 * representa un recibo de empleado
 */
export interface Receipt extends BaseIdDTO {
  period:Date;
  description:string;
  signed:Date;
  disagree:string;
  company:CompanyName;
}
