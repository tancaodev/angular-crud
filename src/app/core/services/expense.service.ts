import {
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
} from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
} from '@angular/fire/compat/database';
import { IExpense } from '../models/common.model';

@Injectable({
    providedIn: 'root',
})
export class ExpenseService {
    private dbPath = '/expenses';
    private injector = inject(Injector);
    expensesRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase) {
        this.expensesRef = db.list(this.dbPath);
    }

    getAllExpenses() {
        return this.expensesRef;
    }

    getExpense(key: string) {
        return runInInjectionContext(this.injector, () => {
            const db = inject(AngularFireDatabase);
            return db.object(`${this.dbPath}/${key}`);
        });
    }

    addExpenses(expense: IExpense) {
        this.expensesRef.push(expense);
    }

    updateExpenses(key: string, expense: IExpense) {
        this.expensesRef.update(key, expense);
    }

    deleteExpenses(key: string) {
        return this.expensesRef.remove(key);
    }
}
