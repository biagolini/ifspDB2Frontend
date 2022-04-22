import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerPanelComponent } from './components/customer-panel/customer-panel.component';

const routes: Routes = [
  { path: '', component: CustomerPanelComponent },
  { path: ':id', component: CustomerDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
