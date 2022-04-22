import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderPanelComponent } from './components/order-panel/order-panel.component';

const routes: Routes = [
  { path: '', component: OrderPanelComponent },
  { path: ':id', component: OrderDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
