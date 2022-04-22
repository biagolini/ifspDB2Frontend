import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {
  
  constructor(
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
  ) {}



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  currentUser(){
    return this.userService.userFirstName;
  }

  changeLanguage(): void {
    let cl = this.translateService.currentLang;
    if(cl=="pt")  this.translateService.use("en");
    else  this.translateService.use("pt");
  }

}
