import {Injectable} from "@angular/core";
import {CompanyName} from "@model/enum/companyName";

/**
 * Servicio de configuracion de app
 */
@Injectable()
export class ConfigService {

  /**
   * nombre de la aplicacion
   */
  public readonly company:CompanyName;
  public companyAssets:string;

  readonly dynamicProperties=["background-color","button-color"];

  //=============== constructor ========================

  /**
   * constructor
   */
  constructor() {
    //determino que aplicacion es por el hostname de la url
    const hostname:string = window.location.hostname.toLowerCase();
    if (hostname.indexOf("igm")>=0)
      this.company=CompanyName.IGM;
    else
      if (hostname.indexOf("flock")>=0)
        this.company=CompanyName.FLOCK;
      else
        this.company=CompanyName.ACCIONA;
  }

  /**
   * setea un tema que le pases, o sino el defecto segun url
   * @param company
   */
  setTheme(company?:CompanyName):void {
    const newTheme:CompanyName = company||this.company;
    let title;
    let manifest;
    //index title
    switch (newTheme) {
      case CompanyName.ACCIONA:
        title="Acciona IT - Empleados"
        manifest="manifest.webmanifest";
        break;
      case CompanyName.IGM:
        title="IGM - Empleados"
        manifest="manifestIGM.webmanifest";
        break;
      case CompanyName.FLOCK:
        title="FLOCK IT - Empleados"
        manifest="manifestFLOCK.webmanifest";
        break;
    }
    document.title=title;
    //index icon
    const icon = "assets/icons/"+newTheme.toLowerCase()+"/icon-192x192.png";
    document.getElementById('icon').setAttribute('href', icon);
    document.getElementById('apple-icon').setAttribute('href', icon);
    //index manifest
    document.getElementById('manifest').setAttribute('href', manifest);
    //seteo variables de CSS
    this.dynamicProperties.forEach(k => {
        document.documentElement.style.setProperty("--"+k,
          getComputedStyle(document.documentElement).getPropertyValue("--"+k+"-"+newTheme));
      }
    );
    //seteo path imagenes
    this.companyAssets=this.company.toLowerCase();
  }

}
