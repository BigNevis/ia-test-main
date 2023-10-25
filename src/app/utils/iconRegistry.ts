import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * registro de iconos
 * https://github.com/Templarian/MaterialDesign-SVG
 */
export class IconRegistry {

  /**
   * list of icons name
   * path /assets/icons/[name].svg
   */
  // tslint:disable-next-line: quotemark
  static readonly ICONS = ['user', 'exit', 'recipt', 'vacation', 'document',
    'community', 'filter', 'receipt-red', 'receipt-orange', 'receipt-green',
    'download', 'go', 'pass', 'open-mini', 'download-mini', 'back-arrow', 'key', 'signed'];

  /**
   * registra la lista de iconitos custom
   * @param registry
   * @param sanitizer
   */
  static registryCustomIcons(registry: MatIconRegistry, sanitizer: DomSanitizer): void {
    this.ICONS.forEach(icon =>
      registry.addSvgIcon(icon, sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/' + icon + '.svg')));
  }



}
