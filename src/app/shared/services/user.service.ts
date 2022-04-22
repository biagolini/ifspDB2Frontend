import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  set userFirstName(userFirstName: string) {
    localStorage.setItem('userFirstName', userFirstName);
  }

  get userFirstName(){    
    if( localStorage.getItem('userFirstName') == null ){
      return 'Entrar';
    } else {
       return (localStorage.getItem('userFirstName') as string);
    }
  }

}
