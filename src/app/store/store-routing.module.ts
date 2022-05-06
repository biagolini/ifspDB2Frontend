import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreDetailsComponent } from './components/store-details/store-details.component';
import { StoreOffersComponent } from './components/store-offers/store-offers.component';
import { StorePanelComponent } from './components/store-panel/store-panel.component';

const routes: Routes = [
  { path: '', component: StoreOffersComponent },
  { path: 'offer-panel', component: StorePanelComponent },
  { path: 'details/:id', component: StoreDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
