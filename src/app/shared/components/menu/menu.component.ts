import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

import { ScreenMonitorService } from '../../services/screen-monitor.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  
  constructor(
    private translateService: TranslateService,
    private screenMonitorService: ScreenMonitorService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    ) {  }


  getCartSize():number {
    return this.shoppingCartService.nCartSize;
  }

  isDisplay(option: string){
    return this.screenMonitorService.isDisplay(option);  
  }


  ngOnInit(): void {
    this.shoppingCartService.updateCartSize();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  currentUser(){
    return this.authenticationService.userFirstName;
  }

  changeLanguage(): void {
    let cl = this.translateService.currentLang;
    if(cl=="pt")  this.translateService.use("en");
    else  this.translateService.use("pt");
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  statusLogin():boolean {
    return this.authenticationService.statusLogin();
  }

  
}
