import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderPanelComponent } from './components/order-panel/order-panel.component';
import { SearchOrderDialogComponent } from './components/search-order-dialog/search-order-dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderPanelComponent,
    SearchOrderDialogComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
