import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { ServerApis } from 'src/app/api.constants';
import { TokenData } from 'src/app/auth/TokenData';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { TokenStorageService } from '../token/token-storage.service';
import { TransportService } from '../transport/transport.service';
import { FiscalYear } from 'src/app/models/FiscalYear';

const AUTH_API = ServerApis.userLoginURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenData = new ReplaySubject<TokenData | null>(1);
  decodedTokenInfo: any;
  loggedInUserName: string;
  loggedInEmail: string;
  loggedInMobileNumber: string;
  loggedInAddress: string;
  dateOfBirth: Date;
  gender: string;
  expirationDate: any;
  clearTimeOut: any;


  constructor(
    private transportService: TransportService,
    private storageService: TokenStorageService,
    private toastrService: ToastrService,
    private jwtTokenService: JwtTokenService,
    private router: Router
  ) { }

  async login(email: string, password: string) {
    this.transportService.CreateRaw({ email, password }, AUTH_API).subscribe(
      (res: any) => {
        this.afterSuccessfullLogin(res);
      },
      (error) => {
        if (error.status === 401) {
          this.toastrService.error(
            "Email/Password doesn't match",
            'Invalid Credentials',
            {
              progressBar: true,
            }
          );
        } else if (error.status === 400) {
          this.toastrService.error('Please fill required fields', 'Error', {
            progressBar: true,
          });
        } else {
          this.toastrService.error(
            'An error occured, please try agian later.',
            'Error',
            {
              progressBar: true,
            }
          );
        }
      }
    );
  }



  private afterSuccessfullLogin(tokenData: TokenData) {
    this.decodedTokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenData.accessToken);
    this.loggedInUserName = this.decodedTokenInfo.fullName;
    this.loggedInEmail = this.decodedTokenInfo.email;
    this.loggedInAddress = this.decodedTokenInfo.address;
    this.loggedInMobileNumber = this.decodedTokenInfo.mobileNumber;
    this.dateOfBirth = this.decodedTokenInfo.dateOfBirth;
    this.gender = this.decodedTokenInfo.gender;
    let tokenExpirationDate = (this.decodedTokenInfo.exp) * 1000;
    this.expirationDate = new Date(tokenExpirationDate);
    const currentDate: any = new Date();
    const user = new TokenData(tokenData.accessToken, this.loggedInUserName, this.loggedInEmail, this.loggedInMobileNumber, this.loggedInAddress, this.expirationDate, this.dateOfBirth, this.gender);

    this.tokenData.next(user);
    this.storageService.saveUser(user);
    this.router.navigate(['/pages/dashboard'])
    this.autoLogout(this.expirationDate - currentDate)

  }

  async setActiveFiscalYear(fiscalYear: FiscalYear) {
    console.log(fiscalYear)
  }

  public autoLogin() {
    const user = this.storageService.getUser();
    if (user == null) {
      return;
    }
    this.tokenData.next(user);
    let date = new Date().getTime();
    let expirationDateAfterAutoLogin = new Date(user.tokenExpirationDate).getTime();
    this.router.navigate(['/pages']);
    this.autoLogout(expirationDateAfterAutoLogin - date);
  }

  public autoLogout(expirationDateData: number) {
    this.clearTimeOut = setTimeout(() => {
      this.logout();
    }, expirationDateData)
  }

  public logout() {
    this.tokenData.next(null);
    this.storageService.removeUser();
    this.router.navigate(['/login']);
  }
}
