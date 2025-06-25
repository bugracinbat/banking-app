import React from "react";
import { mockBookings } from "../data/mockData";
import type { Booking } from "../types/banking";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function BookingPage() {
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState<"flight" | "hotel" | "all">("all");
  const [filtered, setFiltered] = React.useState<Booking[]>(mockBookings);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    let results = mockBookings;
    if (type !== "all") results = results.filter((b) => b.type === type);
    if (search)
      results = results.filter((b) =>
        b.destination.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(results);
  }, [search, type]);

  React.useEffect(() => {
    if (search.length > 0) {
      const uniqueDestinations = Array.from(
        new Set(mockBookings.map((b) => b.destination))
      );
      const filteredSuggestions = uniqueDestinations.filter((dest) =>
        dest.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [search]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Travel Booking</CardTitle>
            <CardDescription>
              Find and book flights or hotels for your next trip.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 relative">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search destination..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  autoComplete="off"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow-md mt-1 max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="p-3 border rounded-lg bg-white/80"
              >
                <option value="all">All</option>
                <option value="flight">Flights</option>
                <option value="hotel">Hotels</option>
              </select>
              <Button className="bg-blue-500 text-white">Search</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-gray-500">
              No bookings found.
            </div>
          )}
          {filtered.map((booking) => (
            <Card key={booking.id} className="shadow-md">
              <CardHeader>
                <CardTitle>
                  {booking.type === "flight" ? "✈️ Flight" : "🏨 Hotel"} to{" "}
                  {booking.destination}
                </CardTitle>
                <CardDescription>
                  {booking.startDate.toLocaleDateString()} -{" "}
                  {booking.endDate.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  Amount:{" "}
                  <span className="font-semibold">
                    ${booking.amount.toFixed(2)}
                  </span>
                </div>
                <div className="mb-2">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {booking.status}
                  </span>
                </div>
                {booking.notes && (
                  <div className="mb-2">Notes: {booking.notes}</div>
                )}
                <Button className="bg-blue-500 text-white mt-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
