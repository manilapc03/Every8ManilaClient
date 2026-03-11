import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth-service';
import { DebugPanelComponent } from '../../components/debug-panel.component/debug-panel.component';


@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  router = inject(Router);

  authService = inject(AuthService);

  //constructor(private authService: AuthService) {}

  handlelogout() {
    this.authService.logout();
  }

  handleRefreshToken() {
    this.authService.refreshToken();
  }

  handleUserList() {
    this.router.navigateByUrl("/userlist")
  }

  handleAccessCountList() {
    this.router.navigateByUrl("/accesscountlist")
  }

}
