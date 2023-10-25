/**
 * archivo adjunto
 */
import {BaseIdDTO} from "./baseIdDTO";

export interface FileAttach extends BaseIdDTO{
  name?:string; //nombre archivo
  contentType:string; //http content type
  isImage:boolean; //flag para ver si es imagen
  file?:string;//base64 cuando se carga; sino url del backend
  icon?:string;//para cuando no es una imagen
  ext?:string; //extension del archivo
}
