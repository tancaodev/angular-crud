import {
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private collection = 'users';
    private injector = inject(Injector);

    constructor(private firestore: AngularFirestore, private router: Router) {}

    login(email: string, password: string) {
        return runInInjectionContext(this.injector, async () => {
            try {
                const userRef = this.firestore.collection(
                    this.collection,
                    (ref) =>
                        ref
                            .where('email', '==', email)
                            .where('password', '==', password)
                );
                console.log(userRef);

                const userSnapshot = await firstValueFrom(userRef.get());

                if (!userSnapshot.empty) {
                    const user = userSnapshot.docs[0].data();
                    console.log('User logged in:', user);
                    localStorage.setItem('user', JSON.stringify(user));
                    this.router.navigate(['/']);

                    return user;
                } else {
                    throw new Error('Invalid email or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        });
    }

    logout() {
        localStorage.removeItem('user');
        console.log('User logged out');
        this.router.navigate(['/auth']);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }

    getCurrentRole() {
        const user = localStorage.getItem('user');

        
    }
}
