import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

/**
 * lista de modulos de angular material
 */
const modules = [
  BrowserAnimationsModule, // angular material animation module
  FlexLayoutModule, // flex
  // componentes angular material
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatProgressBarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatDialogModule,
  FormsModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
];

/**
 * Modulo angular material
 */
@NgModule({
  imports: [modules],
  exports: [modules],
  providers: [FormGroupDirective],
})
export class MaterialModule {}
