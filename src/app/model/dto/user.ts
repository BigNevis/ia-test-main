import {BaseIdDTO} from "./baseIdDTO";
import {FileAttach} from "@model/dto/fileAttach";

/**
 * Usuario
 */
export interface User extends BaseIdDTO{
  user:string;
  password?:string;
  mail:string;
  name:string;
  photo: FileAttach;
}
