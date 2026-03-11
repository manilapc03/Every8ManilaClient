import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, map, Observable, take, tap } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { jwtDecode } from 'jwt-decode';
import { AuthClient } from './auth-client';
import { Token } from '../../model/Login/token';
import { Role } from '../../model/Login/role';
import { Claims } from './Claims';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  private PROVIDER_GOOGLE = 'GOOGLE';

  constructor(
    private authClient: AuthClient,
    private socialAuthService: SocialAuthService,
    private router: Router) 
  {
    this.socialAuthService.authState.subscribe(user => 
    {
      if (user && user.provider && user.provider === this.PROVIDER_GOOGLE) 
      {
        this.socialLogin(user);
      }
    });
  }
  
  public socialLogin(user: SocialUser) {
    console.log('AuthService-Username:', user.email);
    console.log('AuthService-provider:', user.provider);

    debugger;
    const token = user.provider === this.PROVIDER_GOOGLE ? user.idToken : user.authToken;
    return this.authClient.socialLogin(user.email, user.provider, token)
      .pipe(take(1))
      .subscribe( {
        next: (response) => this.handleSuccessLogging(response.token, response.refreshToken),
        error: (err) => console.log(err.error.message || 'Login failed'),
        complete: () => console.log('this.authClient.socialLogin - Done.'),
      });
  }

  public login(username: string, password: string) {
    console.log('AuthService-Username:', username);
    console.log('AuthService-Password:', password);

    // response =>
    debugger;
    return this.authClient.login(username, password)
      .pipe(take(1))
      .subscribe( {
        next: (response) => this.handleSuccessLogging(response.token, response.refreshToken),
        error: (err) => console.log(err.error.message || 'Login failed'),
        complete: () => console.log('this.authClient.login - Done.'),
      });
  }

  private handleSuccessLogging(accessToken: string, refreshToken: string) {
    debugger;

    console.log('handleSuccessLogging ');

    const decodedToken = jwtDecode<any>(accessToken);
    const token: Token = 
    {
      userName: decodedToken[Claims.NameTokenKey],
      email: decodedToken[Claims.EmailTokenKey],
      role: decodedToken[Claims.RoleTokenKey],
      raw: accessToken,
    };

    console.log('userName: '+token.userName);
    console.log('email: '+token.email);
    console.log('role: '+token.role);

    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);

    console.log('accessToken:'+this.getToken());
    console.log('refreshToken:'+this.getRefreshToken());
      
    this.router.navigate(['/home']);
  }


  public register(userName: string, email: string, password: string) {
    console.log('AuthService-userName:', userName);
    console.log('AuthService-email:', email);
    console.log('AuthService-Password:', password);

    return this.authClient.register(userName, email, password).pipe(take(1));
  }

  public refreshToken() 
  {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    const refreshToken = localStorage.getItem(this.refreshTokenKey);

    console.log('AuthService-accessToken:', accessToken);
    console.log('AuthService-refreshToken:', refreshToken);

    debugger;
    if (accessToken && refreshToken) 
    {
      return this.authClient.refreshToken(accessToken, refreshToken)
        .pipe(take(1))
        .subscribe( {
          next: (response) => this.handleSuccessLogging(response.accessToken, response.refreshToken),
          error: (err) => alert(err.error.errors[0] || ' Refresh token failed.'),
          complete: () => console.log('this.authClient.login - Done.'),
        });
    }
    return false;
  }

  public logout() 
  {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.socialAuthService.signOut(true);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }


}
