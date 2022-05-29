import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseBalanceComponent } from './components/warehouse-balance/warehouse-balance.component';
import { WarehouseEntranceComponent } from './components/warehouse-entrance/warehouse-entrance.component';
import { WarehouseExitComponent } from './components/warehouse-exit/warehouse-exit.component';

const routes: Routes = [
  { path: '', component: WarehouseBalanceComponent },
  { path: 'entrance', component: WarehouseEntranceComponent },
  { path: 'exit', component: WarehouseExitComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
