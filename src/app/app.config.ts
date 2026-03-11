import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { 
    provideHttpClient, 
    withFetch, 
    withInterceptors, 
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  SocialAuthServiceConfig
} from '@abacritt/angularx-social-login';
import { authInterceptor } from './services/Auth/auth-interceptor';
import { environment } from '../environments/environment';
import { GoogleSigninButtonDirective } from './services/Auth/google-signin-button.directive';
//import { DebugPanelComponent } from './components/debug-panel.component/debug-panel.component';

export const appConfig: ApplicationConfig = {
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

    provideRouter(routes, 
            withInMemoryScrolling(
                { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), 
            withEnabledBlockingInitialNavigation()),
    provideBrowserGlobalErrorListeners(),
      {
          provide: 'SocialAuthServiceConfig',
          useValue: {
              autoLogin: false,
              providers: [
                  {
                      id: GoogleLoginProvider.PROVIDER_ID,
                      provider: new GoogleLoginProvider(environment.socialLogin.google.clientId),
                  },
                  {
                      id: FacebookLoginProvider.PROVIDER_ID,
                      provider: new FacebookLoginProvider(environment.socialLogin.facebook.clientId),
                  },
              ],
              onError: err => {
                  console.error(err);
              },
          } as SocialAuthServiceConfig,
      },
    provideHttpClient(
        withFetch(), withInterceptors
        ([authInterceptor])
      )
  ]
};
