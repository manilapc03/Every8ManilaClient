import { Injectable, inject, effect, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../model/Login/login-response';
import { RefreshTokenResponse } from '../../model/Login/refresh-token-response';

@Injectable({
  providedIn: 'root',
})

export class AuthClient {
  private http = inject(HttpClient);

  public login(username: string, password: string): Observable<LoginResponse> {
    debugger;
    return this.http.post<LoginResponse>(
      environment.apiUrl + '/auth/login',
      {
        username: username,
        password: password,
      }
    );
  }

  public socialLogin(email: string, provider: string, accessToken: string): Observable<LoginResponse> 
  {
    debugger;
    return this.http.post<LoginResponse>(
      environment.apiUrl + '/auth/social-login',
      {
        email: email,
        provider: provider,
        accessToken: accessToken,
      }
    );
  }

  public register(username: string, email: string, password: string) 
  {
    return this.http.post(environment.apiUrl + '/auth/register', 
    {
      username: username,
      email: email,
      password: password,
    });
  }

  public refreshToken(accessToken: string,refreshToken: string): Observable<RefreshTokenResponse> 
  {
    return this.http.post<RefreshTokenResponse>(
      environment.apiUrl + '/auth/refresh-token',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    );
  }  


}

