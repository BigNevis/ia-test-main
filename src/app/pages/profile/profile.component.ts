import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/authService';
import { PopupService } from '@services/popupService';
import { UserService } from '@services/userService';
import { Constants } from '@utils/constants';
import { Utils } from '@utils/utils';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { UtilService } from '@services/utilService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends OnDestroyMixin implements OnInit {

  constructor(public authService: AuthService, private popupService: PopupService,
    private userService: UserService, private utilService: UtilService) {
    super();
  }

  ngOnInit(): void {
  }
  getPhoto(): string {
    const file = this.authService.getUser() ? this.authService.getUser().photo : null;
    const fileURI = Utils.getFilesPath();
    return (file && file.id) ? fileURI + file.id : Constants.EXT_IMAGES.PROFILE;
  }

  /**
   * Subir imagen del usuario
   */
  uploadUserPhoto() {
    this.popupService.showFileUploadPopup({ resizeToWidth: 100, roundCropper: true })
      .afterClosed()
      .pipe(untilComponentDestroyed(this))
      .subscribe(result => {
        if (result) {
          this.userService.saveUserPhoto(result)
            .then(response => {
              if (response.status == 200) {
                this.utilService.showSnack("La foto se ha actualizado correctamente.");
              }
            });
        }
      });
  }
}
