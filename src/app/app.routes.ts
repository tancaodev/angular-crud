import { Routes } from '@angular/router';
import { ExpenseComponent } from './pages/expense/expense.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { AuthenticateFormComponent } from './pages/authenticate/login-form.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: ExpenseComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'expense-form',
        component: ExpenseFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'expense-form/:id',
        component: ExpenseFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        component: AuthenticateFormComponent,
        canActivate: [NoAuthGuard],
    },
];
