import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderPanelComponent } from './components/order-panel/order-panel.component';


@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderPanelComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
