export interface IExpense {
    key?: string;
    title: string;
    description: string;
    price: string;
}

export interface User {
    email: string;
    password: string;
    role: 'admin' | 'user';
}
