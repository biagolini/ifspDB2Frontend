import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { StorePanelComponent } from './components/store-panel/store-panel.component';
import { StoreRoutingModule } from './store-routing.module';
import { StoreOffersComponent } from './components/store-offers/store-offers.component';


@NgModule({
  declarations: [
    StoreDetailsComponent,
    StorePanelComponent,
    StoreOffersComponent,
   
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ]
})
export class StoreModule { }
