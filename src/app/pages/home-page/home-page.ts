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

  showTables = false;
  router = inject(Router);

  authService = inject(AuthService);

  //constructor(private authService: AuthService) {}

  handlelogout() {
    this.authService.logout();
  }

  handleHomePage() {
    this.router.navigateByUrl("/")
  }

  handleRefreshToken() {
    this.authService.refreshToken();
  }

  handleAccessCountList() {
    this.router.navigateByUrl("/accesscountlist")
  }

  handleShopList() {
    this.router.navigateByUrl("/shopList")
  }

  handleUserList() {
    this.router.navigateByUrl("/userlist")
  }

  handleUsersBlockShopList() {
    this.router.navigateByUrl("/usersblockshoplist")
  }

}
