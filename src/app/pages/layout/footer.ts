import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../utils/constants';


@Component({
  selector: 'layout-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  rutas = Constants.URL;
  constructor(private router: Router) { }

  getActualRoute() {
    return this.router.url;
  }
  goTo(param?) {
    switch (param) {
      case 'receipts':
        this.router.navigate([this.rutas.RECEIPTS], {
          skipLocationChange: true
        });
        break;

      default:
        this.router.navigate([this.rutas.PROFILE], {
          skipLocationChange: true
        });
        break;
    }

  }

}
