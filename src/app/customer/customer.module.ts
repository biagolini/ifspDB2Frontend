import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerPanelComponent } from './components/customer-panel/customer-panel.component';
import { CustomerRoutingModule } from './customer-routing.module';


@NgModule({
  declarations: [
    CustomerDetailsComponent,
    CustomerPanelComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
