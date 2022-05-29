import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { StoreOffersComponent } from './components/store-offers/store-offers.component';


const routes: Routes = [
  { path: '', component: StoreOffersComponent },
  { path: 'details/:id', component: StoreDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
