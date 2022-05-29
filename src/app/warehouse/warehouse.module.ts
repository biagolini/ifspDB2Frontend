import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseBalanceComponent } from './components/warehouse-balance/warehouse-balance.component';
import { WarehouseEntranceComponent } from './components/warehouse-entrance/warehouse-entrance.component';
import { WarehouseExitComponent } from './components/warehouse-exit/warehouse-exit.component';


@NgModule({
  declarations: [
    WarehouseBalanceComponent,
    WarehouseEntranceComponent,
    WarehouseExitComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ]
})
export class WarehouseModule { }
