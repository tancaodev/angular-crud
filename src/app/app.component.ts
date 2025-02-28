import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'angular-crud';

    constructor(public authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
    }
}
