import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-expense-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
})
export class AuthenticateFormComponent {
    loginForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    async login() {
        try {
            console.log(this.loginForm.value);
            const user = {
                email: this.loginForm.value.email,
                password: this.loginForm.value.password,
            };
            await this.authService.login(user.email, user.password);
            alert('Login successful');
        } catch (error) {
            console.log('Login failed: ' + error);
        }
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.login()
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
