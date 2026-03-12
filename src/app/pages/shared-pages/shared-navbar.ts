import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
// IMPORTANT: You need to import your AuthService here so the HTML can use it!
// import { AuthService } from '../services/Auth/auth.service'; 

@Component({
    selector: 'app-shared-navbar',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive], // <-- REQUIRED for routing and routerLink!
    templateUrl: './shared-navbar.html',
    styleUrl: './shared-navbar.css'
})
export class SharedNavbarComponent {
    // Inject your router and auth service
    router = inject(Router);
    // authService = inject(AuthService); // Uncomment when your service is imported

    // Controls the sidebar dropdown
    showTables = false;

    // Logout handler
    handlelogout() {
        // this.authService.logout();
        this.router.navigate(['/login']);
    }
}