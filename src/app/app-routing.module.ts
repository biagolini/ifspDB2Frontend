import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthenticatedGuard } from './authentication/guards/admin-authentication.guard';
import { EstoqueGuard } from './authentication/guards/estoque.guard';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { SiteMapComponent } from './shared/components/site-map/site-map.component';
import { WorkerRequestComponent } from './shared/components/worker-request/worker-request.component';

const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () =>
    import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  
  },
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./store/store.module').then((m) => m.StoreModule)
      }, 
      { 
        path: 'shopping_cart',
        component: ShoppingCartComponent,  
      },
      {
        path: 'customer',
        canActivate: [AdminAuthenticatedGuard],
        loadChildren: () =>
        import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'order',
        canActivate: [AdminAuthenticatedGuard],
        loadChildren: () =>
        import('./order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'store',
        loadChildren: () =>
        import('./store/store.module').then((m) => m.StoreModule),        
      },
      {
        path: 'warehouse',
        canActivate: [EstoqueGuard],
        loadChildren: () =>
        import('./warehouse/warehouse.module').then((m) => m.WarehouseModule),        
      },
      { 
        path: 'about',
        component: AboutUsComponent,  
      },
      { 
        path: 'map',
        component: SiteMapComponent,  
      },
      { 
        path: 'contact',
        component: ContactComponent,  
      }, 
      { 
        path: 'workerRequest',
        canActivate: [EstoqueGuard],
        component: WorkerRequestComponent,  
      }, 
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
