import { HttpParams } from "@angular/common/http";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { environment } from "../../environments/environment";
import { Pageable } from "@model/dto/pageable";
import { Constants } from "@utils/constants";
import { Receipt } from '@model/dto/receipt';


/**
 * utilidades varias
 */
export class Utils {

  /**
   * pasa de un pageable a httpparams para los request
   * @param pageable
   */
  static convertPagebale(pageable: Pageable): HttpParams {
    let params: HttpParams = new HttpParams()
      .set("page", pageable.page.toString())
      .set("size", pageable.size.toString());
    //.set("sort",pageable.sort+","+pageable.sortDirection);
    //if (pageable.filter) params = params.set("filter",pageable.filter);
    return params;
  }

  /**
   * limpia un control de valor y validaciones
   * @param formControl
   */
  static cleanFormControl(formControl: AbstractControl): void {
    formControl.reset();
    formControl.clearValidators();
    formControl.updateValueAndValidity();
    formControl.markAsPristine();
  }

  /**
   * recupera el largo de un campo
   * @param form
   * @param field
   */
  static getFieldControlLength(form: FormGroup, field: string): number {
    let value;
    if (form && form.controls[field])
      value = form.controls[field].value;
    if (value) {
      if (typeof value === 'number')
        return (value as number).toString().length;
      else
        return value.length;
    } else
      return 0;
  }

  /**
   * loguea errores de campos
   * @param form
   */
  static logValidationsForm(form: FormGroup) {
    //common validators
    if (!environment.production) {//solo para desa
      Object.keys(form.controls).forEach(key => {
        const controlErrors: ValidationErrors = form.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('control: "' + key + '", error: "' + keyError + '", value: ', controlErrors[keyError]);
          });
        }
      });
    }
  }

  /**
   * pasa un archivo a base64
   * @param file
   */
  static toBase64(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * devuelve el iconito segun el mime type
   * @param mimeType
   */
  static getMimeIcon(mimeType: string): string {
    let result: string;
    switch (mimeType) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        result = Constants.EXT_IMAGES.FILE_DOC;
        break;
      case "application/pdf":
        result = Constants.EXT_IMAGES.FILE_PDF;
        break;
    }
    return result;
  }

  /**
   * descarga un archivo
   * @param name
   * @param file
   */
  static downloadFile(name: string, file: string): void {
    const downloadLink = document.createElement("a");
    downloadLink.href = file;
    downloadLink.download = name;
    downloadLink.click();
  }

  /**
   * Devuelve el path de los files
   */
  static getFilesPath(): string {
    return environment.SERVER + Constants.URL.API_PATH + Constants.URL.FILES_PATH;
  }

  /**
   * Validates an email address
   * @param mail
   */
  static validateEmail(mail): boolean {
    let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(mail);
  }

  /**
   * formatea un cuit a xx-xxxxxxxx-x
   * @cuit un número de 11 dígitos
   */
  static formatCuit(cuit: string): string {
    return cuit.replace(/(\d{2})(\d{8})(\d)/, "$1-$2-$3")
  }
  iconsReceipt(receipt: Receipt): string {
    if (!receipt.signed) {
      return 'receipt-red';
    } else if (receipt.signed && receipt.disagree) {
      return 'receipt-orange';
    } else {
      return 'receipt-green';
    }
  }
}
