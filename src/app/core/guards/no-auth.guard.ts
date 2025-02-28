import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canActivate(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);

        if (user) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}
