import { Injectable } from '@angular/core';
import { TokenData } from 'src/app/auth/TokenData';
import { FiscalYear } from 'src/app/models/FiscalYear';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() { }

  public saveUser(tokenData: TokenData): void {
    localStorage.setItem('loggedUser', JSON.stringify(tokenData));
  }

  public getToken(): string | null {
    if (localStorage.getItem('loggedUser') !== null) {
      let tokenData: TokenData = JSON.parse(localStorage.getItem('loggedUser')!);
      return tokenData.accessToken;
    }

    return null;
  }


  public getUser(): TokenData | null {
    if (localStorage.getItem('loggedUser') !== null) {
      let tokenData: TokenData = JSON.parse(localStorage.getItem('loggedUser')!);
      return tokenData;
    }

    return null;
  }

  public removeUser(): void {
    if (localStorage.getItem('loggedUser') !== null) {
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('fiscalYearStatus')
    }
  }
}
