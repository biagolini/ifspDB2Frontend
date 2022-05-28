import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtResponse } from 'src/app/shared/models/jwt-response.model';
import { map, Observable } from 'rxjs';

interface PasswordInfo {
  email: string;
  password: string;
  setPasswordToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }


  authenticate(loginInfo: { email: string; password: string }): Observable<void> {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth`, loginInfo)
      .pipe<void>(
        map((response) => {         
          this.currentEmail = loginInfo.email;
          this.bearerToken = response.token;
          this.userProfile = response.scope;
          this.userName = response.name; 
          return;
        })
      );
  }


  logout() {
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
  }

  refreshToken() {
    return this.http
      .get<any>(`${environment.apiUrl}/authenticate/refresh_token`, {})
      .pipe(
        take(1),
        tap((response) => {
          this.bearerToken = response.token;
        })
      );
  }

  isRole(role: string): boolean {
    switch (role) {
      case 'admin':
        return localStorage.getItem('userProfile') === 'admin';     
      default:
        return localStorage.getItem('userProfile') === 'customer';
    }
  }

  set currentEmail(currentEmail) {
    localStorage.setItem('currentEmail', currentEmail );
  }


  get currentEmail() {
    if( localStorage.getItem('currentEmail') == null ){
        return 'kn'
  } else {
         return (localStorage.getItem('currentEmail') as string).substring(0,1);
    }
  }


  set userProfile(userProfile: string) {
    localStorage.setItem('userProfile', userProfile);
  }


  get beareuserNamerToken() {
    return localStorage.getItem('bearerToken');
  }

  set userName(userName: string) {
    localStorage.setItem('userName', userName as string);
  }


  get bearerToken() {
    return localStorage.getItem('bearerToken');
  }

  set bearerToken(bearerToken) {
    localStorage.setItem('bearerToken', bearerToken as string);
  }

  get isAuthenticated(): boolean {
    return !!this.bearerToken;
  }

  
  get userFirstName(){    
    if( localStorage.getItem('userName') == null ){
      return 'Entrar';
    } else {

      var str =(localStorage.getItem('userName') as string)
      var firstName = str.split(" "); 

      return firstName[0].toUpperCase();
    }
  }

  statusLogin():boolean {  
    if(this.bearerToken) return true; 
    return false;
  }

  
}
