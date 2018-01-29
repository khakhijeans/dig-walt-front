import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'app/shared/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    user_name: string;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.user_name = JSON.parse(localStorage.getItem('user')).name;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
