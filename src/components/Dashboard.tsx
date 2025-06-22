import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Transfer } from "./Transfer";
import { mockAccounts, mockTransactions, mockUser } from "../data/mockData";
import { formatCurrency, formatDate } from "../lib/utils";
import {
  CreditCard,
  TrendingUp,
  Send,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  MoreHorizontal,
} from "lucide-react";

export function Dashboard() {
  const [showBalance, setShowBalance] = React.useState(true);
  const [showTransfer, setShowTransfer] = React.useState(false);

  const totalBalance = mockAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const recentTransactions = mockTransactions.slice(0, 5);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <CreditCard className="h-5 w-5" />;
      case "savings":
        return <TrendingUp className="h-5 w-5" />;
      case "credit":
        return <CreditCard className="h-5 w-5" />;
      case "investment":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">NeoBank</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Good morning, {mockUser.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview for today.
          </p>
        </div>

        {/* Total Balance Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-primary-foreground/90">
                Total Balance
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-primary-foreground/90 hover:bg-primary-foreground/10"
              >
                {showBalance ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">
              {showBalance ? formatCurrency(totalBalance) : "••••••"}
            </div>
            <p className="text-primary-foreground/80">Across all accounts</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button
            className="h-16 flex-col space-y-2"
            onClick={() => setShowTransfer(true)}
          >
            <Send className="h-5 w-5" />
            <span>Transfer</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-2">
            <Plus className="h-5 w-5" />
            <span>Add Money</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-2">
            <CreditCard className="h-5 w-5" />
            <span>Pay Bills</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-2">
            <TrendingUp className="h-5 w-5" />
            <span>Invest</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accounts Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Accounts</CardTitle>
                <CardDescription>Overview of all your accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-secondary rounded-lg">
                          {getAccountIcon(account.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {account.accountNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {showBalance
                            ? formatCurrency(account.balance)
                            : "••••••"}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {account.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your latest activity</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "credit"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : ""}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        {transaction.pending && (
                          <p className="text-xs text-muted-foreground">
                            Pending
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Transfer Modal */}
      {showTransfer && <Transfer onClose={() => setShowTransfer(false)} />}
    </div>
  );
}
