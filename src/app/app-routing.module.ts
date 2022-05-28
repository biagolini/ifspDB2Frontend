import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthenticatedGuard } from './authentication/guards/admin-authentication.guard';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';

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

    ],
  },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
