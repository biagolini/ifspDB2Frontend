import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

import { ScreenMonitorService } from '../../services/screen-monitor.service';
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
    private screenMonitorService: ScreenMonitorService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private themeService: ThemeService,
  ) { }

  isDisplay(option: string){
    return this.screenMonitorService.isDisplay(option);  
  }

  openClose() {
    this.isOpen = !this.isOpen;
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
