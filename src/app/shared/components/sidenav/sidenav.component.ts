import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router,
    private themeService: ThemeService,
  ) {}

  searchControl = new FormControl('');
  isOpen = false;
  
  isDark = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );


    openClose() {
      this.isOpen = !this.isOpen;
    }

    

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
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
