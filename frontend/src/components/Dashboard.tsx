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
import { AddMoney } from "./AddMoney";
import { PayBills } from "./PayBills";
import { Invest } from "./Invest";
import { TransactionDetails } from "./TransactionDetails";
import { Booking } from "./Booking";
import { mockAccounts, mockTransactions } from "../data/mockData";
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
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Dashboard() {
  const { currentUser } = useUser();
  const [showBalance, setShowBalance] = React.useState(true);
  const [showTransfer, setShowTransfer] = React.useState(false);
  const [showAddMoney, setShowAddMoney] = React.useState(false);
  const [showPayBills, setShowPayBills] = React.useState(false);
  const [showInvest, setShowInvest] = React.useState(false);
  const [showBooking, setShowBooking] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<any>(null);

  // Filter accounts and transactions by userId if available
  const userAccounts = mockAccounts.filter((a) => a.id[0] === currentUser.id); // Example: match by id prefix
  const userTransactions = mockTransactions.filter((t) =>
    userAccounts.some((a) => a.id === t.accountId)
  );

  const totalBalance = userAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  const recentTransactions = userTransactions.slice(0, 5);
  const navigate = useNavigate();

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
    <div className="min-h-screen gradient-professional">
      {/* Remove old header, navbar is now global */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up animate-delay-200">
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg animate-number">
            Good morning, {currentUser.name.split(" ")[0]}!
          </h1>
          <p className="text-white/80 text-lg animate-fade-in animate-delay-300">
            Here's your financial overview for today.
          </p>
        </div>

        {/* Total Balance Card */}
        <Card className="mb-8 gradient-card animate-gradient text-white shadow-colorful hover-lift animate-fade-in-up animate-delay-500">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-2xl animate-fade-in-left">
                Total Balance
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/90 hover:bg-white/10 shadow-pink hover:scale-110 transition-all duration-300 animate-spin-slow"
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
            <div className="text-5xl font-bold mb-4 drop-shadow-lg animate-number">
              {showBalance ? formatCurrency(totalBalance) : "••••••"}
            </div>
            <p className="text-white/90 text-lg animate-fade-in">
              Across all accounts
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 animate-fade-in-up">
          <Button
            className="h-16 flex-col space-y-2 gradient-primary shadow-colorful hover:scale-110 transition-all duration-300 hover-glow animate-bounce-in animate-delay-100"
            onClick={() => setShowTransfer(true)}
          >
            <Send className="h-5 w-5 animate-pulse-slow" />
            <span>Transfer</span>
          </Button>
          <Button
            className="h-16 flex-col space-y-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-blue hover:scale-110 transition-all duration-300 hover-lift animate-bounce-in animate-delay-200"
            onClick={() => setShowAddMoney(true)}
          >
            <Plus className="h-5 w-5 animate-spin-slow" />
            <span>Add Money</span>
          </Button>
          <Button
            className="h-16 flex-col space-y-2 bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-pink hover:scale-110 transition-all duration-300 hover-glow animate-bounce-in animate-delay-300"
            onClick={() => setShowPayBills(true)}
          >
            <CreditCard className="h-5 w-5 animate-pulse-slow" />
            <span>Pay Bills</span>
          </Button>
          <Button
            className="h-16 flex-col space-y-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-colorful hover:scale-110 transition-all duration-300 hover-lift animate-bounce-in animate-delay-500"
            onClick={() => setShowInvest(true)}
          >
            <TrendingUp className="h-5 w-5 animate-spin-slow" />
            <span>Invest</span>
          </Button>
          <Button
            className="h-16 flex-col space-y-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-blue hover:scale-110 transition-all duration-300 hover-lift animate-bounce-in animate-delay-600"
            onClick={() => navigate("/booking")}
          >
            <span role="img" aria-label="Travel">
              ✈️
            </span>
            <span>Book Travel</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accounts Overview */}
          <div className="lg:col-span-2">
            <Card className="glass-effect border-white/20 shadow-colorful hover-lift animate-fade-in-left">
              <CardHeader>
                <CardTitle className="text-white animate-fade-in">
                  Your Accounts
                </CardTitle>
                <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
                  Overview of all your accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userAccounts.map((account, index) => (
                    <div
                      key={account.id}
                      className={`flex items-center justify-between p-4 rounded-lg account-${
                        account.type
                      } text-white shadow-lg hover:scale-105 transition-all duration-300 hover-glow animate-fade-in-up animate-delay-${
                        (index + 1) * 100
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          {getAccountIcon(account.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {account.name}
                          </h3>
                          <p className="text-sm text-white/80">
                            {account.accountNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white text-lg">
                          {showBalance
                            ? formatCurrency(account.balance)
                            : "••••••"}
                        </p>
                        <p className="text-sm text-white/80 capitalize font-medium">
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
            <Card className="glass-effect border-white/20 shadow-blue hover-lift animate-fade-in-right">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white animate-fade-in">
                      Recent Transactions
                    </CardTitle>
                    <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
                      Your latest activity
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/80 hover:bg-white/10 hover:scale-110 transition-all duration-300 animate-spin-slow"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover-glow animate-fade-in-up animate-delay-${
                        (index + 2) * 100
                      } cursor-pointer`}
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.type === "credit"
                              ? "bg-green-400/20 text-green-200"
                              : "bg-red-400/20 text-red-200"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-white/70">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "credit"
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {showTransfer && <Transfer onClose={() => setShowTransfer(false)} />}
      {showAddMoney && <AddMoney onClose={() => setShowAddMoney(false)} />}
      {showPayBills && <PayBills onClose={() => setShowPayBills(false)} />}
      {showInvest && <Invest onClose={() => setShowInvest(false)} />}
      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
      {showBooking && <Booking onClose={() => setShowBooking(false)} />}
    </div>
  );
}
