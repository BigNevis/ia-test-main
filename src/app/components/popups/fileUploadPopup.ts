import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploadPopupOptions} from "@model/other/fileUploadPopupOptions";
import {CustomValidators} from "@utils/customValidators";
import {Constants} from "@utils/constants";
import {Utils} from "@utils/utils";
import {UtilService} from "@services/utilService";
import {ImageTransform} from "ngx-image-cropper/lib/interfaces";

/**
 * popup para recortar imagenes
 */
@Component({
  selector: 'file-upload-popup',
  templateUrl: './fileUploadPopup.html'
})
export class FileUploadPopup implements OnInit{

  options:FileUploadPopupOptions; //opciones del popup
  form: FormGroup; //formulario
  imageChangedEvent: any; //evento al cambiar imagen
  allowFileTypes:string; //formato de archivos permitidos
  loading:boolean=false; //cargando imagen

  base64File: any; //archivo cortado
  mimeType:string; //es el content type del archivo
  icon:string; //es el iconito si no es una imagen
  fileExt:string; //tipo archivo
  imageTransform:ImageTransform={flipH:false, flipV:false, rotate:0, scale:0};

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent; //cropper component

  //=============== constructor========================

  /**
   * constructor
   * @param dialogRef
   * @param fb
   * @param utilService
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<FileUploadPopup>,
              private fb:FormBuilder, private utilService:UtilService,
              @Inject(MAT_DIALOG_DATA) private data: FileUploadPopupOptions) {
    this.options={ //opciones por defecto
      showNameField: data.showNameField || false,
      onlyImages: data.onlyImages!=null ? data.onlyImages:true,
      maintainAspectRatio:  data.maintainAspectRatio!=null ? data.maintainAspectRatio:true,
      resizeToWidth: data.resizeToWidth || 0,
      resizeToHeight: data.resizeToHeight || 0,
      roundCropper: data.roundCropper || false
    }
  }

  /**
   * init
   */
  ngOnInit(): void {
    //tipo de archivos aceptados
    this.allowFileTypes=this.options.onlyImages?Constants.FILES.EXT_IMAGES:Constants.FILES.EXT_ALL;
    //formulario
    this.form = this.fb.group({
      name: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(45), CustomValidators.alphanumeric]]
    });
  }

  //=============== metodos =========================

  /**
   * evento al seleccionar un archivo nuevo
   * @param event
   */
  fileChangeEvent(event: any): void {
    this.loading=true;
    this.base64File=null;
    this.mimeType=null;
    //valido tipo de archivo
    const file:File = event.target.files[0];
    this.fileExt = file.name.split(".").pop().toLowerCase();
    if (this.allowFileTypes.indexOf(this.fileExt)<0) {
      this.utilService.showSnack("Seleccione un archivo de formato válido.");
      this.loading=false;
      return;
    }
    //validaciones ok
    if (Constants.FILES.EXT_IMAGES.indexOf(this.fileExt)>=0) {
      //le paso el archivo al resize de imagenes
      this.mimeType=Constants.FILES.MIME_PNG;
      this.fileExt=Constants.FILES.EXT_PNG;//sobre escribo tipo de imagen
      this.icon=null;
      this.imageChangedEvent = event;
    } else {
      this.imageChangedEvent = null;
      //TODO valido tamaño maximo
      Utils.toBase64(file)
        .then( result=>{
          this.mimeType=file.type;
          this.icon=Utils.getMimeIcon(this.mimeType);
          this.base64File=result;
        })
        .catch( error=> {
          console.error(error);
          this.utilService.showSnack("No se ha podido leer el archivo seleccionado.");
        })
        .finally(()=>this.loading=false);
    }
    //tomo nombre
    if (this.form.value["name"]==null) {
      let name:string = event.target.files[0].name;
      name=name[name.length-4]=="."? name.substring(0,name.length-4):name;//remuevo extension
      this.form.controls["name"].patchValue(name.length<=45?name:name.substring(0,45));//ajusto largo maximo
    }
  }

  /**
   * imagen cargada al cropper
   */
  imageLoaded() {
    this.loading=false;
    this.base64File=null;
  }

  /**
   * imagen cortada
   * @param event
   */
  imageCropped(event: ImageCroppedEvent) {
    this.base64File = event.base64;
    //como el compoente solo hace el resize por ancho o alto, tengo que agregar esta logica, por si necesita hacer doble crop
    if (this.options.resizeToHeight!=0 && event.height>this.options.resizeToHeight) {
      this.imageCropper.resizeToWidth = 0;
      this.imageCropper.crop();
      this.imageCropper.resizeToWidth=this.options.resizeToWidth;
    }
    if (this.options.resizeToWidth!=0 && event.width>this.options.resizeToWidth) {
      this.imageCropper.resizeToHeight = 0;
      this.imageCropper.crop();
      this.imageCropper.resizeToHeight=this.options.resizeToHeight;
    }
  }

  rotateLeft() {
    this.imageTransform={
      ...this.imageTransform,
      rotate: this.imageTransform.rotate-90
    };
  }
  rotateRight() {
    this.imageTransform={
      ...this.imageTransform,
      rotate: this.imageTransform.rotate+90
    };
  }
  flip() {
    this.imageTransform={
      ...this.imageTransform,
      flipH: !this.imageTransform.flipH
    };
  }

  /**
   * cancelar
   */
  cancel(): void {
    this.dialogRef.close();
  }

  /**
   * json de respuessta
   */
  save():void {
    this.dialogRef.close( {
      name:this.form.value["name"],
      ext:this.fileExt,
      file:this.base64File,
      contentType:this.mimeType
    });
  }

}
