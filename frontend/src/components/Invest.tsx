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
import {
  TrendingUp,
  CreditCard,
  BarChart3,
  PieChart,
  DollarSign,
  Target,
} from "lucide-react";

interface InvestProps {
  onClose: () => void;
}

export function Invest({ onClose }: InvestProps) {
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [investmentType, setInvestmentType] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [riskLevel, setRiskLevel] = React.useState("moderate");
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

  const investmentOptions = [
    {
      id: "stocks",
      name: "Stocks",
      icon: TrendingUp,
      color: "text-green-400",
      return: "8-12%",
      risk: "High",
    },
    {
      id: "bonds",
      name: "Bonds",
      icon: BarChart3,
      color: "text-blue-400",
      return: "3-5%",
      risk: "Low",
    },
    {
      id: "mutual",
      name: "Mutual Funds",
      icon: PieChart,
      color: "text-purple-400",
      return: "6-10%",
      risk: "Moderate",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: DollarSign,
      color: "text-orange-400",
      return: "Variable",
      risk: "Very High",
    },
  ];

  const riskLevels = [
    { id: "conservative", name: "Conservative", color: "bg-green-500" },
    { id: "moderate", name: "Moderate", color: "bg-yellow-500" },
    { id: "aggressive", name: "Aggressive", color: "bg-red-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const investment = investmentOptions.find((i) => i.id === investmentType);
    alert(
      `Successfully invested ${formatCurrency(parseFloat(amount))} in ${
        investment?.name
      }!`
    );
    setIsSubmitting(false);
    onClose();
  };

  const selectedAccountData = mockAccounts.find(
    (acc) => acc.id === selectedAccount
  );
  const selectedInvestment = investmentOptions.find(
    (i) => i.id === investmentType
  );
  const investmentAmount = parseFloat(amount) || 0;

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
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-400 to-indigo-500 shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader>
          <CardTitle className="text-white text-2xl animate-fade-in flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 animate-pulse-slow" />
            <span>Invest</span>
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            Build your wealth with smart investments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Selection */}
            <div className="animate-fade-in-up animate-delay-200">
              <label className="text-sm font-medium mb-2 block text-white">
                Invest From Account
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

            {/* Investment Type Selection */}
            <div className="animate-fade-in-up animate-delay-300">
              <label className="text-sm font-medium mb-2 block text-white">
                Investment Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {investmentOptions.map((investment) => {
                  const IconComponent = investment.icon;
                  return (
                    <div
                      key={investment.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                        investmentType === investment.id
                          ? "bg-white/20 border-white/50"
                          : "bg-white/10 border-white/20 hover:bg-white/15"
                      }`}
                      onClick={() => setInvestmentType(investment.id)}
                    >
                      <div className="text-center">
                        <IconComponent
                          className={`h-5 w-5 mx-auto mb-1 ${investment.color}`}
                        />
                        <div className="text-white text-xs font-medium">
                          {investment.name}
                        </div>
                        <div className="text-white/70 text-xs">
                          {investment.return} • {investment.risk}
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
                Investment Amount
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
              <div className="mt-2 flex space-x-2">
                {[100, 500, 1000, 2500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className="px-3 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition-all duration-300"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Level */}
            <div className="animate-fade-in-up animate-delay-500">
              <label className="text-sm font-medium mb-2 block text-white">
                Risk Tolerance
              </label>
              <div className="flex space-x-2">
                {riskLevels.map((risk) => (
                  <button
                    key={risk.id}
                    type="button"
                    onClick={() => setRiskLevel(risk.id)}
                    className={`px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105 ${
                      riskLevel === risk.id
                        ? `${risk.color} shadow-lg`
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {risk.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Summary */}
            {selectedAccount && investmentType && investmentAmount > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 animate-bounce-in hover-glow">
                <h3 className="font-medium mb-3 text-white animate-pulse-slow">
                  Investment Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/80">From Account:</span>
                    <span className="text-white font-medium">
                      {selectedAccountData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Investment:</span>
                    <span className="text-white font-medium">
                      {selectedInvestment?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="text-white font-medium animate-number">
                      {formatCurrency(investmentAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Expected Return:</span>
                    <span className="text-green-300 font-medium">
                      {selectedInvestment?.return}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Risk Level:</span>
                    <span className="text-white font-medium">
                      {riskLevels.find((r) => r.id === riskLevel)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/20 pt-2">
                    <span className="text-white/80">Transaction Fee:</span>
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
                className="flex-1 bg-white text-purple-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 hover-glow animate-pulse-slow"
                disabled={
                  !selectedAccount || !investmentType || !amount || isSubmitting
                }
              >
                {isSubmitting ? "Processing..." : "Invest Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
