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

  authenticate(loginInfo: { username: string; password: string }): Observable<void> {
    return this.http
      .post<JwtResponse>(`${environment.apiUrl}/auth`, loginInfo)
      .pipe<void>(
        map((response) => {         
          this.currentUsername = loginInfo.username;
          this.bearerToken = response.token;
          this.userProfile = response.scope;
          this.nickName = response.name; 
          return;
        })
      );
  }


  logout() {
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('nickName');
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

  set currentUsername(currentUsername) {
    localStorage.setItem('currentUsername', currentUsername );
  }


  get currentUsername() {
    if( localStorage.getItem('currentUsername') == null ){
        return 'email'
  } else {
         return (localStorage.getItem('currentUsername') as string);
    }
  }


  set userProfile(userProfile: string) {
    localStorage.setItem('userProfile', userProfile);
  }


  get beareuserNamerToken() {
    return localStorage.getItem('bearerToken');
  }

  set nickName(nickName: string) {
    localStorage.setItem('nickName', nickName as string);
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
    if( localStorage.getItem('nickName') == null ){
      return 'Entrar';
    } else {

      var str =(localStorage.getItem('nickName') as string)
      var firstName = str.split(" "); 

      return firstName[0].toUpperCase();
    }
  }

  statusLogin():boolean {  
    if(this.bearerToken) return true; 
    return false;
  }

  
}
