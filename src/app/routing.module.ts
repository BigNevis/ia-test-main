import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPage } from '@pages/prelogin/loadingPage';
import { Constants } from '@utils/constants';
import { LoginPage } from '@pages/prelogin/loginPage';
import { ReceiptsPage } from '@pages/receipt/receiptsPage';
import { DirectAccessGuard } from '@utils/routing/directAccessGuard';
import { LoginPassForgottenPage } from '@pages/prelogin/passForgotten/loginPassForgottenPage';
import { HomeComponent } from '@pages/home/home.component';
import { ActionsComponent } from '@pages/receipt/actions/actions.component';
import { SignComponent } from '@pages/receipt/sign/sign.component';
import { ProfileComponent } from './pages/profile/profile.component';

/**
 * configuracion de urls
 */
const routes: Routes = [
  // pagina inicial
  { path: '', component: LoadingPage },
  // login
  { path: Constants.URL.LOGIN, component: LoginPage },
  // login password forgotten
  {
    path: Constants.URL.LOGIN_PASS_FORGOTTEN,
    component: LoginPassForgottenPage,
  },
  // home
  { path: Constants.URL.HOME, component: HomeComponent },
  { path: Constants.URL.ACTIONS, component: ActionsComponent },
  // receipts
  {
    path: Constants.URL.RECEIPTS,
    component: ReceiptsPage,
    canActivate: [DirectAccessGuard],
  },
  // sign
  { path: Constants.URL.SIGN, component: SignComponent },
  // profile
  { path: 'profile', component: ProfileComponent },
  // redireccion
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  // FIXME damiang, relativeLinkResolution: 'legacy' probar si lo sacamos sigue funcionado todo ok
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ], // permite navegar a la misma pagina
  exports: [RouterModule],
})
export class RoutingModule {}
