export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  accountNumber: string;
  currency: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: "debit" | "credit";
  amount: number;
  description: string;
  category: string;
  date: Date;
  pending?: boolean;
}

export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
  date: Date;
  status: "pending" | "completed" | "failed";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
}

export interface Booking {
  id: string;
  userId: string;
  type: "flight" | "hotel";
  destination: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  status: "booked" | "cancelled" | "completed";
  notes?: string;
}
