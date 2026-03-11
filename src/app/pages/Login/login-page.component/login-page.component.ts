import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormField, form, submit } from '@angular/forms/signals';
import { AuthService } from '../../../services/Auth/auth-service';
import { initialLoginData, LoginModel, loginSchema } from '../../../model/Login/login.model';
import { SocialLoginComponent } from '../../../components/social-login/social-login.component';
import { DebugPanelComponent } from '../../../components/debug-panel.component/debug-panel.component';



@Component({
  selector: 'app-login-page.component',
  imports: [FormField, SocialLoginComponent, DebugPanelComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  email = '';
  password = '';
  errorMessage = '';

  router = inject(Router);

  // , private router: Router
  constructor(private authService: AuthService) { }

  login = signal<LoginModel>(initialLoginData);
  loginForm = form(this.login, loginSchema);


  handlelogin() {

    console.log('Username:', this.loginForm.username().value());
    console.log('Password:', this.loginForm.password().value());

    this.email = this.loginForm.username().value();
    this.password = this.loginForm.password().value();

    this.authService.login(this.email, this.password);    
  }

}
