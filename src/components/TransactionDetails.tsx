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
import { formatCurrency, formatDate } from "../lib/utils";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  Clock,
  FileText,
  Copy,
} from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  pending?: boolean;
  category?: string;
  merchant?: string;
  location?: string;
  reference?: string;
}

interface TransactionDetailsProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionDetails({
  transaction,
  onClose,
}: TransactionDetailsProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transactionDetails = {
    ...transaction,
    category:
      transaction.category ||
      (transaction.type === "credit" ? "Deposit" : "Purchase"),
    merchant: transaction.merchant || "Online Transfer",
    location: transaction.location || "New York, NY",
    reference: transaction.reference || `TXN${transaction.id.toUpperCase()}`,
  };

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
      <Card className="w-full max-w-md bg-white shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader
          className={`${
            transaction.type === "credit"
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : "bg-gradient-to-r from-red-400 to-pink-500"
          } text-white`}
        >
          <CardTitle className="text-white text-xl animate-fade-in flex items-center space-x-2">
            {transaction.type === "credit" ? (
              <ArrowDownRight className="h-5 w-5 animate-pulse-slow" />
            ) : (
              <ArrowUpRight className="h-5 w-5 animate-pulse-slow" />
            )}
            <span>Transaction Details</span>
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            {transactionDetails.category} •{" "}
            {formatDate(new Date(transaction.date))}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Amount */}
            <div className="text-center animate-fade-in-up animate-delay-200">
              <div
                className={`text-4xl font-bold animate-number ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "credit" ? "+" : ""}
                {formatCurrency(Math.abs(transaction.amount))}
              </div>
              {transaction.pending && (
                <div className="inline-flex items-center space-x-1 mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs animate-pulse-slow">
                  <Clock className="h-3 w-3" />
                  <span>Pending</span>
                </div>
              )}
            </div>

            {/* Transaction Info */}
            <div className="space-y-3 animate-fade-in-up animate-delay-300">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Description</span>
                </div>
                <span className="text-sm font-medium">
                  {transaction.description}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Date & Time</span>
                </div>
                <span className="text-sm font-medium">
                  {formatDate(new Date(transaction.date))}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Merchant</span>
                </div>
                <span className="text-sm font-medium">
                  {transactionDetails.merchant}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Location</span>
                </div>
                <span className="text-sm font-medium">
                  {transactionDetails.location}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Reference</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium font-mono">
                    {transactionDetails.reference}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(transactionDetails.reference)
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy reference"
                  >
                    <Copy className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {copied && (
              <div className="text-center animate-bounce-in">
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  <span>✓ Copied to clipboard</span>
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6 animate-fade-in-up">
            <Button
              onClick={onClose}
              className="flex-1 hover:scale-105 transition-all duration-300"
            >
              Close
            </Button>
            <Button
              variant="outline"
              className="flex-1 hover:scale-105 transition-all duration-300"
              onClick={() => {
                // Simulate dispute/report functionality
                alert("Dispute report has been submitted for review.");
                onClose();
              }}
            >
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
