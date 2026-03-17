import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth-service';

@Component({
    selector: 'app-shared-navbar',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './shared-navbar.html',
    styleUrl: './shared-navbar.css'
})
export class SharedNavbarComponent {
    // Inject your router and auth service
    router = inject(Router);
    authService = inject(AuthService);

    // Controls the sidebar dropdown
    showTables = false;

    // Logout handler
    handlelogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    handleRefresh() {
        this.authService.refreshToken();
    }
}