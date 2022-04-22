import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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


  authenticate(loginInfo: { login: string; password: string }) {
    return this.http
      .post<string>(`${environment.apiUrl}/authentication/login`, loginInfo, {
        responseType: 'text' as 'json',
      })

      .pipe(
        take(1),
        tap((token) => {
          this.currentLogin = loginInfo.login;

          this.bearerToken = token;

          this.http
            .get(`${environment.apiUrl}/api/self/group`)
            .subscribe((roleId) => {
              this.roleId = roleId as string;
            });
        }),

      );
  }

  doFirstAccess(passwordInfo: PasswordInfo) {
    return this.http
      .put<any>(
        `${environment.apiUrl}/authentication/first-access`,
        passwordInfo
      )
  }

  resetPassword(email: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/authentication/reset-password/${email}`,{})
      .pipe(take(1));
  }

  logout() {
    localStorage.removeItem('currentLogin');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('roleId');
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
        return localStorage.getItem('roleId') === '1';
      case 'analyst':
        return localStorage.getItem('roleId') === '2';
      default:
        return localStorage.getItem('roleId') === '3';
    }
  }

  set currentLogin(currentLogin) {
    localStorage.setItem('currentLogin', currentLogin );
  }


  get currentLogin() {
    if( localStorage.getItem('currentLogin') == null ){
        return 'kn'
  } else {
         return (localStorage.getItem('currentLogin') as string).substring(0,1);
    }
  }


  set roleId(roleId: string) {
    localStorage.setItem('roleId', roleId);
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
}
