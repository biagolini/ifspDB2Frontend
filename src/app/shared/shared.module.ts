import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';

import { MenuComponent } from './components/menu/menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RequestConfirmDialogComponent } from './components/request-confirm-dialog/request-confirm-dialog.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SafePipe } from './pipe/safe.pipe';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { ContactComponent } from './components/contact/contact.component';
import { WorkerRequestComponent } from './components/worker-request/worker-request.component';



var module = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  HttpClientModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,  
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatRadioModule,
  CurrencyMaskModule,
  MatProgressSpinnerModule,
  NgxMaskModule,
  TextMaskModule,
];

@NgModule({
  declarations: [
    MenuComponent,
    PageNotFoundComponent,
    RequestConfirmDialogComponent,
    SidenavComponent,
    SafePipe,
    ShoppingCartComponent,
    AboutUsComponent,
    SiteMapComponent,
    ContactComponent,
    WorkerRequestComponent
  ],
  imports: [
    module,
    CommonModule
  ],
  exports: [
    module, SafePipe
  ]
})
export class SharedModule { }
