import React from "react";
import { createPortal } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { mockAccounts } from "../data/mockData";
import { formatCurrency } from "../lib/utils";
import { CreditCard, TrendingUp, Zap, Wifi, Car, Home } from "lucide-react";

interface PayBillsProps {
  onClose: () => void;
}

export function PayBills({ onClose }: PayBillsProps) {
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [selectedBill, setSelectedBill] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
      case "credit":
        return <CreditCard className="h-4 w-4" />;
      case "savings":
      case "investment":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const billTypes = [
    {
      id: "electric",
      name: "Electric Bill",
      icon: Zap,
      color: "text-yellow-400",
      amount: 120.5,
    },
    {
      id: "internet",
      name: "Internet",
      icon: Wifi,
      color: "text-blue-400",
      amount: 79.99,
    },
    {
      id: "car",
      name: "Car Payment",
      icon: Car,
      color: "text-red-400",
      amount: 295.0,
    },
    {
      id: "rent",
      name: "Rent/Mortgage",
      icon: Home,
      color: "text-green-400",
      amount: 1200.0,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const billName = billTypes.find((b) => b.id === selectedBill)?.name;
    alert(
      `Successfully scheduled payment of ${formatCurrency(
        parseFloat(amount)
      )} for ${billName}!`
    );
    setIsSubmitting(false);
    onClose();
  };

  const selectedAccountData = mockAccounts.find(
    (acc) => acc.id === selectedAccount
  );
  const selectedBillData = billTypes.find((b) => b.id === selectedBill);
  const paymentAmount = parseFloat(amount) || 0;

  // Set amount when bill is selected
  React.useEffect(() => {
    if (selectedBillData && !amount) {
      setAmount(selectedBillData.amount.toString());
    }
  }, [selectedBillData, amount]);

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Card className="w-full max-w-md bg-gradient-to-br from-orange-400 to-red-500 shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader>
          <CardTitle className="text-white text-2xl animate-fade-in flex items-center space-x-2">
            <CreditCard className="h-6 w-6 animate-pulse-slow" />
            <span>Pay Bills</span>
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            Pay your bills quickly and securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Selection */}
            <div className="animate-fade-in-up animate-delay-200">
              <label className="text-sm font-medium mb-2 block text-white">
                Pay From Account
              </label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300"
                required
              >
                <option value="">Select account</option>
                {mockAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} - {formatCurrency(account.balance)}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill Selection */}
            <div className="animate-fade-in-up animate-delay-300">
              <label className="text-sm font-medium mb-2 block text-white">
                Select Bill
              </label>
              <div className="grid grid-cols-2 gap-2">
                {billTypes.map((bill) => {
                  const IconComponent = bill.icon;
                  return (
                    <div
                      key={bill.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedBill === bill.id
                          ? "bg-white/20 border-white/50"
                          : "bg-white/10 border-white/20 hover:bg-white/15"
                      }`}
                      onClick={() => setSelectedBill(bill.id)}
                    >
                      <div className="text-center">
                        <IconComponent
                          className={`h-6 w-6 mx-auto mb-1 ${bill.color}`}
                        />
                        <div className="text-white text-xs font-medium">
                          {bill.name}
                        </div>
                        <div className="text-white/70 text-xs">
                          {formatCurrency(bill.amount)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amount */}
            <div className="animate-fade-in-up animate-delay-500">
              <label className="text-sm font-medium mb-2 block text-white">
                Amount
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 placeholder:text-white/50 hover:bg-white/20 transition-all duration-300 focus:scale-105"
                required
              />
            </div>

            {/* Due Date */}
            <div className="animate-fade-in-up animate-delay-500">
              <label className="text-sm font-medium mb-2 block text-white">
                Due Date (Optional)
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 focus:scale-105"
              />
            </div>

            {/* Summary */}
            {selectedAccount && selectedBill && paymentAmount > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 animate-bounce-in hover-glow">
                <h3 className="font-medium mb-3 text-white animate-pulse-slow">
                  Payment Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">From Account:</span>
                    <span className="text-white font-medium">
                      {selectedAccountData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Bill:</span>
                    <span className="text-white font-medium">
                      {selectedBillData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="text-white font-medium animate-number">
                      {formatCurrency(paymentAmount)}
                    </span>
                  </div>
                  {dueDate && (
                    <div className="flex justify-between">
                      <span className="text-white/80">Due Date:</span>
                      <span className="text-white font-medium">
                        {new Date(dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/20 pt-2">
                    <span className="text-white/80">Processing Fee:</span>
                    <span className="text-green-300 font-medium">Free</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 animate-fade-in-up">
              <Button
                type="button"
                className="flex-1 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-white text-red-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 hover-glow animate-pulse-slow"
                disabled={
                  !selectedAccount || !selectedBill || !amount || isSubmitting
                }
              >
                {isSubmitting
                  ? "Processing..."
                  : dueDate
                  ? "Schedule Payment"
                  : "Pay Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
