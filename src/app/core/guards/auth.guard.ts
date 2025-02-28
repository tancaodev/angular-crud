import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    canActivate(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        
        // if (user && user.role === 'admin') {
        //     return true;
        // } else {
        //     this.router.navigate(['/auth']);
        //     return false;
        // }

        if (user) {
            
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
}
