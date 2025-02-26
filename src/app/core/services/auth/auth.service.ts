import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    signUp(email: string, password: string) {
        this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Sign up successful
                this.router.navigate(['/']);
            })
            .catch((error) => {
                // An error occurred
                console.log(error);
            });
    }

    async login(email: string, password: string) {
        try {
            const user = await this.afAuth.signInWithEmailAndPassword(
                email,
                password
            );
            console.log('User logged in:', user);
            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logout() {
        await this.afAuth.signOut();
        console.log('User logged out');
    }

    getCurrentUser() {
        return this.afAuth.authState;
    }

    // get isAuthenticated(): boolean {
    //     return this.afAuth.currentUser !== null;
    // }
}
