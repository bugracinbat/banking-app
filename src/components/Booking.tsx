import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createPortal } from "react-dom";

interface BookingProps {
  onClose: () => void;
}

export function Booking({ onClose }: BookingProps) {
  const [type, setType] = React.useState<"flight" | "hotel">("flight");
  const [destination, setDestination] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert(`Successfully booked your ${type} to ${destination}!`);
    setIsSubmitting(false);
    onClose();
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
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-400 to-cyan-500 shadow-colorful border-0 animate-bounce-in hover-glow">
        <CardHeader>
          <CardTitle className="text-white text-2xl animate-fade-in flex items-center space-x-2">
            <span>Travel Booking</span>
          </CardTitle>
          <CardDescription className="text-white/80 animate-fade-in animate-delay-100">
            Book your next trip easily
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div className="animate-fade-in-up animate-delay-200">
              <label className="text-sm font-medium mb-2 block text-white">
                Type
              </label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  className={`flex-1 ${
                    type === "flight"
                      ? "bg-white/20 border-white/50"
                      : "bg-white/10 border-white/20"
                  }`}
                  onClick={() => setType("flight")}
                >
                  Flight
                </Button>
                <Button
                  type="button"
                  className={`flex-1 ${
                    type === "hotel"
                      ? "bg-white/20 border-white/50"
                      : "bg-white/10 border-white/20"
                  }`}
                  onClick={() => setType("hotel")}
                >
                  Hotel
                </Button>
              </div>
            </div>
            {/* Destination */}
            <div className="animate-fade-in-up animate-delay-300">
              <label className="text-sm font-medium mb-2 block text-white">
                Destination
              </label>
              <Input
                type="text"
                placeholder="e.g. Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 placeholder:text-white/50 hover:bg-white/20 transition-all duration-300 focus:scale-105"
                required
              />
            </div>
            {/* Dates */}
            <div className="flex space-x-2 animate-fade-in-up animate-delay-400">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block text-white">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 focus:scale-105"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block text-white">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 focus:scale-105"
                  required
                />
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
            {/* Notes */}
            <div className="animate-fade-in-up animate-delay-600">
              <label className="text-sm font-medium mb-2 block text-white">
                Notes (optional)
              </label>
              <Input
                type="text"
                placeholder="Any special requests?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 placeholder:text-white/50 hover:bg-white/20 transition-all duration-300 focus:scale-105"
              />
            </div>
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
                className="flex-1 bg-white text-blue-600 hover:bg-white/90 hover:scale-110 transition-all duration-300 hover-glow animate-pulse-slow"
                disabled={
                  !type ||
                  !destination ||
                  !startDate ||
                  !endDate ||
                  !amount ||
                  isSubmitting
                }
              >
                {isSubmitting ? "Booking..." : "Book Now"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
}
