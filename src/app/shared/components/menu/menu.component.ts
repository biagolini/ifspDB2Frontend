import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  
  constructor(
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    ) {
      breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    }

  destroyed = new Subject<void>();
  currentScreenSize!: string;
  
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.Web, 'Web'],
    [Breakpoints.HandsetPortrait, 'Handset'],
    [Breakpoints.TabletPortrait, 'Tablet'],
    [Breakpoints.WebPortrait, 'Web'],
    [Breakpoints.HandsetLandscape, 'Handset'],
    [Breakpoints.TabletLandscape, 'Tablet'],
    [Breakpoints.WebLandscape, 'Web'],
  ]);
  getCartSize():number {
    return this.shoppingCartService.nCartSize;
  }

  
  isDisplay(option: string){
    if(option==this.currentScreenSize) return true;
    else return false    
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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
