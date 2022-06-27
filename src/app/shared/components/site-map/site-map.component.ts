import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {

  constructor(    
    private router: Router,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit(): void {
  }
  openLink(url: string){
    this.router.navigate([url]);
  }

  isRole(role: string): boolean {
    return this.authenticationService.isRole(role);
  }

}
