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
import { ArrowRight, CreditCard, TrendingUp } from "lucide-react";

interface TransferProps {
  onClose: () => void;
}

export function Transfer({ onClose }: TransferProps) {
  const [fromAccount, setFromAccount] = React.useState("");
  const [toAccount, setToAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
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

    alert("Transfer completed successfully!");
    setIsSubmitting(false);
    onClose();
  };

  const selectedFromAccount = mockAccounts.find(
    (acc) => acc.id === fromAccount
  );
  const selectedToAccount = mockAccounts.find((acc) => acc.id === toAccount);
  const transferAmount = parseFloat(amount) || 0;

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
      <Card className="w-full max-w-md gradient-card shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader>
          <CardTitle className="text-white text-2xl animate-fade-in">
            Transfer Money
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            Send money between your accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Account */}
            <div className="animate-fade-in-up animate-delay-200">
              <label className="text-sm font-medium mb-2 block text-white">
                From Account
              </label>
              <select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
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

            {/* To Account */}
            <div className="animate-fade-in-up animate-delay-300">
              <label className="text-sm font-medium mb-2 block text-white">
                To Account
              </label>
              <select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="w-full p-3 border rounded-lg bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300"
                required
              >
                <option value="">Select account</option>
                {mockAccounts
                  .filter((account) => account.id !== fromAccount)
                  .map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>
                  ))}
              </select>
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

            {/* Description */}
            <div className="animate-fade-in-up animate-delay-500">
              <label className="text-sm font-medium mb-2 block text-white">
                Description (Optional)
              </label>
              <Input
                placeholder="What's this transfer for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 placeholder:text-white/50 hover:bg-white/20 transition-all duration-300 focus:scale-105"
              />
            </div>

            {/* Transfer Preview */}
            {fromAccount && toAccount && transferAmount > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 animate-bounce-in hover-glow">
                <h3 className="font-medium mb-3 text-white animate-pulse-slow">
                  Transfer Summary
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    {selectedFromAccount && (
                      <>
                        <div className="p-1 bg-white/20 rounded">
                          {getAccountIcon(selectedFromAccount.type)}
                        </div>
                        <span className="text-white">
                          {selectedFromAccount.name}
                        </span>
                      </>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 text-white animate-pulse-slow" />
                  <div className="flex items-center space-x-2">
                    {selectedToAccount && (
                      <>
                        <div className="p-1 bg-white/20 rounded animate-spin-slow">
                          {getAccountIcon(selectedToAccount.type)}
                        </div>
                        <span className="text-white">
                          {selectedToAccount.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-medium text-white animate-number">
                      {formatCurrency(transferAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-white/80">Fee:</span>
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
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-blue hover:scale-110 transition-all duration-300 hover-glow animate-pulse-slow"
                disabled={!fromAccount || !toAccount || !amount || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Transfer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
