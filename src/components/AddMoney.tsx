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
import { Plus, CreditCard, TrendingUp, Banknote } from "lucide-react";

interface AddMoneyProps {
  onClose: () => void;
}

export function AddMoney({ onClose }: AddMoneyProps) {
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [source, setSource] = React.useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      `Successfully added ${formatCurrency(
        parseFloat(amount)
      )} to your account!`
    );
    setIsSubmitting(false);
    onClose();
  };

  const selectedAccountData = mockAccounts.find(
    (acc) => acc.id === selectedAccount
  );
  const depositAmount = parseFloat(amount) || 0;

  const fundingSources = [
    { id: "bank", name: "Bank Transfer", icon: "🏦", fee: "Free" },
    { id: "card", name: "Debit Card", icon: "💳", fee: "$2.50" },
    { id: "paypal", name: "PayPal", icon: "🅿️", fee: "Free" },
    { id: "check", name: "Mobile Check Deposit", icon: "📱", fee: "Free" },
  ];

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
      <Card className="w-full max-w-md bg-gradient-to-br from-green-400 to-emerald-500 shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader>
          <CardTitle className="text-white text-2xl animate-fade-in flex items-center space-x-2">
            <Plus className="h-6 w-6 animate-spin-slow" />
            <span>Add Money</span>
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            Fund your account from various sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Selection */}
            <div className="animate-fade-in-up animate-delay-200">
              <label className="text-sm font-medium mb-2 block text-white">
                Add Money To
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

            {/* Amount */}
            <div className="animate-fade-in-up animate-delay-300">
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

            {/* Funding Source */}
            <div className="animate-fade-in-up animate-delay-500">
              <label className="text-sm font-medium mb-2 block text-white">
                Funding Source
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fundingSources.map((sourceOption) => (
                  <div
                    key={sourceOption.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                      source === sourceOption.id
                        ? "bg-white/20 border-white/50"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    }`}
                    onClick={() => setSource(sourceOption.id)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{sourceOption.icon}</div>
                      <div className="text-white text-xs font-medium">
                        {sourceOption.name}
                      </div>
                      <div className="text-white/70 text-xs">
                        {sourceOption.fee}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            {selectedAccount && depositAmount > 0 && source && (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 animate-bounce-in hover-glow">
                <h3 className="font-medium mb-3 text-white animate-pulse-slow">
                  Deposit Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">To Account:</span>
                    <span className="text-white font-medium">
                      {selectedAccountData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="text-white font-medium animate-number">
                      {formatCurrency(depositAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Source:</span>
                    <span className="text-white font-medium">
                      {fundingSources.find((s) => s.id === source)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2">
                    <span className="text-white/80">Fee:</span>
                    <span className="text-white font-medium">
                      {fundingSources.find((s) => s.id === source)?.fee}
                    </span>
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
                className="flex-1 bg-white text-emerald-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 hover-glow animate-pulse-slow"
                disabled={
                  !selectedAccount || !amount || !source || isSubmitting
                }
              >
                {isSubmitting ? "Processing..." : "Add Money"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
