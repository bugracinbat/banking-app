import type { Account, Transaction, User, Goal } from "../types/banking";

export const mockUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
};

export const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Primary Checking",
    type: "checking",
    balance: 12450.75,
    accountNumber: "****1234",
    currency: "USD",
  },
  {
    id: "2",
    name: "High-Yield Savings",
    type: "savings",
    balance: 45892.23,
    accountNumber: "****5678",
    currency: "USD",
  },
  {
    id: "3",
    name: "Travel Credit Card",
    type: "credit",
    balance: -2341.87,
    accountNumber: "****9012",
    currency: "USD",
  },
  {
    id: "4",
    name: "Investment Portfolio",
    type: "investment",
    balance: 78234.19,
    accountNumber: "****3456",
    currency: "USD",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    type: "debit",
    amount: -89.43,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    date: new Date("2024-06-20"),
    pending: false,
  },
  {
    id: "2",
    accountId: "1",
    type: "credit",
    amount: 3200.0,
    description: "Salary Deposit",
    category: "Income",
    date: new Date("2024-06-19"),
    pending: false,
  },
  {
    id: "3",
    accountId: "1",
    type: "debit",
    amount: -1250.0,
    description: "Rent Payment",
    category: "Housing",
    date: new Date("2024-06-18"),
    pending: false,
  },
  {
    id: "4",
    accountId: "2",
    type: "credit",
    amount: 500.0,
    description: "Transfer from Checking",
    category: "Transfer",
    date: new Date("2024-06-17"),
    pending: false,
  },
  {
    id: "5",
    accountId: "3",
    type: "debit",
    amount: -156.78,
    description: "Amazon Purchase",
    category: "Shopping",
    date: new Date("2024-06-16"),
    pending: true,
  },
  {
    id: "6",
    accountId: "1",
    type: "debit",
    amount: -45.2,
    description: "Gas Station",
    category: "Transportation",
    date: new Date("2024-06-15"),
    pending: false,
  },
];

export const mockGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 8500,
    targetDate: new Date("2024-12-31"),
    category: "Emergency",
  },
  {
    id: "2",
    name: "European Vacation",
    targetAmount: 5000,
    currentAmount: 2100,
    targetDate: new Date("2024-08-15"),
    category: "Travel",
  },
  {
    id: "3",
    name: "New Car Down Payment",
    targetAmount: 8000,
    currentAmount: 3200,
    targetDate: new Date("2025-03-01"),
    category: "Transportation",
  },
];
