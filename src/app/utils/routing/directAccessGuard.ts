import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

/**
 * valida que no se acceda directamente a una url
 */
@Injectable()
export class DirectAccessGuard implements CanActivate {

  /**
   * constructor
   * @param router
   */
  constructor(private router: Router) {
  }

  /**
   * canActivate
   * @param next
   * @param state
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // si la pagina anteriror esta vacia entonces el usuario esta intentando acceder directamente por url
    if (this.router.url === '/') {
      this.router.navigate(['/'],{skipLocationChange:true}).then(); // redirecciono a pagina inicial
      return false;
    }
    return true;
  }
}
