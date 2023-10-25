import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

//patterns de validacion
const ALPHA_PATTERN:RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
const ALPHA_SYMBOLS_PATTERN: RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s,._(){}!¡¿?#@%&/+-]*$/;
const ALPHANUMERIC_PATTERN: RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s0-9,.-]*$/;
const ALPHANUMERIC_SYMBOLS_PATTERN:RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s0-9,._(){}!¡¿?#@%&/+-]*$/;
const PATTERN_HTML:RegExp = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s0-9,._(){}<>\\\[\]";:=!¡¿?#@%&/+-]*$/;
const NUMERIC_PATTERN:RegExp = /^[0-9.-]*$/;
const CUIT_PATTERN: RegExp = /^([0-9]{11}|[0-9-]{13})$/;
const PHONE_PATTERN: RegExp =/^[0-9()+\s-]*$/;
const URL_PATTERN: RegExp = /^[0-9a-z+._?&#:/-]*$/; //TODO mejorar

/**
 * validadores
 */
export const CustomValidators = {

  /**
   * validacion por letras y espacions
   * @param control
   */
  alpha(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || ALPHA_PATTERN.test(control.value))
      return null;
    else
      return {"alpha":true, msg:"VALIDATOR_ALPHA"};
  },

  /**
   * validacion con letras, espacios y caracteres de puntuacion
   * @param control
   */
  alphaSymbols(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || ALPHA_SYMBOLS_PATTERN.test(control.value))
      return null;
    else
      return {"alphaSymbols":true, msg:"VALIDATOR_ALPHA_SYMBOLS"};
  },

  /**
   * validacion por letras, espacios y numeros
   * @param control
   */
  alphanumeric(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || ALPHANUMERIC_PATTERN.test(control.value))
      return null;
    else
      return {"alphanumeric":true, msg:"VALIDATOR_ALPHANUMERIC"};
  },

  /**
   * validacion por letras, espacios, numeros  y caracteres de puntuacion
   * @param control
   */
  alphanumericSymbols(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || ALPHANUMERIC_SYMBOLS_PATTERN.test(control.value))
      return null;
    else
      return {"alphanumericSymbols":true, msg:"VALIDATOR_ALPHANUMERIC_SYMBOLS"};
  },

  /**
   * validacion por numeros
   * @param control
   */
  numeric(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || NUMERIC_PATTERN.test(control.value))
      return null;
    else
      return {"numeric":true, msg:"VALIDATOR_NUMERIC"};
  },

  /**
   * validacion de formato cuit
   * @param control
   */
  cuit(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || control.value=="" || CUIT_PATTERN.test(control.value))
      return null;
    else
      return {"cuit":true, msg:"VALIDATOR_CUIT"};
  },

  /**
   * validacion de formato telefono
   * @param control
   */
  phone(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || PHONE_PATTERN.test(control.value))
      return null;
    else
      return {"phone":true, msg:"VALIDATOR_PHONE"};
  },

  /**
   * validacion de formato url
   * @param control
   */
  url(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || URL_PATTERN.test(control.value))
      return null;
    else
      return {"url":true, msg:"VALIDATOR_URL"};
  },

  /**
   * requerido condicional
   * @param predicate predicado a evaluar
   */
  requiredIf(predicate: ()=>boolean): (control: AbstractControl)=>ValidationErrors|null {
    return this.conditionalValidator(predicate,Validators.required)
  },

  /**
   * por una condicion ejecuta una validacion
   * @param predicate
   * @param validator
   */
  conditionalValidator(predicate: () => boolean, validator: (control: AbstractControl) => ValidationErrors | null): (control:AbstractControl)=>ValidationErrors|null {
    return (formControl => {
      if (!formControl.parent) return null;
      if (predicate()) {
        return validator(formControl);
      }
      return null;
    })
  },

  /**
   * validacion por letras, espacios, numeros, caracteres de puntuacion y tags html
   * @param control
   */
  html(control: AbstractControl): ValidationErrors | null {
    if (control.value==null || PATTERN_HTML.test(control.value))
      return null;
    else
      return {"html":true, msg:"VALIDATOR_HTML"};
  }
};
