import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense, User } from '../../core/models/common.model';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
    selector: 'app-expense',
    imports: [CommonModule, RouterModule],
    templateUrl: './expense.component.html',
    styleUrl: './expense.component.scss',
})
export class ExpenseComponent implements OnInit {
    expenses: IExpense[] = [];
    totalExpenses = 0;
    currentUser: User | null = null;

    constructor(
        private expenseService: ExpenseService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAllExpenses();
        this.currentUser = this.authService.getCurrentUser() as User;
    }

    isAdmin(): boolean {
        return this.currentUser?.role === 'admin';
    }
    
    getAllExpenses() {
        this.expenseService
            .getAllExpenses()
            .snapshotChanges()
            .subscribe({
                next: (data) => {
                    this.expenses = [];
                    this.totalExpenses = 0;

                    data.forEach((item) => {
                        let expense = item.payload.toJSON() as IExpense;

                        this.expenses.push({
                            key: item.key || '',
                            title: expense.title,
                            description: expense.description,
                            price: expense.price,
                        });

                        this.totalExpenses += parseInt(expense.price);
                    });
                },
            });
    }

    editExpense(key: string) {
        this.router.navigate(['/expense-form/' + key]);
    }

    removeExpense(key: string) {
        if (window.confirm('Are you sure?')) {
            this.expenseService.deleteExpenses(key);
        }
    }
}
