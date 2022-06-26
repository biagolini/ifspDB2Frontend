import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isOpen = false;  
  isDark = false;


  
  constructor(
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router,
    private themeService: ThemeService,
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



  isDisplay(option: string){
    if(option==this.currentScreenSize) return true;
    else return false    
  }

  openClose() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  statusLogin():boolean {
    return this.authenticationService.statusLogin();
  }


  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

  setDarkTheme(){
    this.isDark= ! this.isDark;
    this.themeService.setTheme(true);
  
  }

  setLigthTheme(){
    this.isDark= ! this.isDark;
    this.themeService.setTheme(false);   
  }


  ngOnInit(): void {
    this.isDark =  this.themeService.isDarkTheme();
  }

  changeLanguage(): void {
    let cl = this.translateService.currentLang;
    if(cl=="pt")  this.translateService.use("en");
    else  this.translateService.use("pt");
  }
}
