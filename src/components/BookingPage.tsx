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

// Mock images and ratings for demo
const mockImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
];
const getRandomImage = () =>
  mockImages[Math.floor(Math.random() * mockImages.length)];
const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0

export function BookingPage() {
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState<"flight" | "hotel" | "all">("all");
  const [filtered, setFiltered] = React.useState<Booking[]>(mockBookings);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [guests, setGuests] = React.useState(1);
  const [sort, setSort] = React.useState("price");

  React.useEffect(() => {
    let results = mockBookings;
    if (type !== "all") results = results.filter((b) => b.type === type);
    if (search)
      results = results.filter((b) =>
        b.destination.toLowerCase().includes(search.toLowerCase())
      );
    // Sorting
    results = [...results].sort((a, b) => {
      if (sort === "price") return a.amount - b.amount;
      if (sort === "rating") return (b as any).rating - (a as any).rating;
      return 0;
    });
    setFiltered(results);
  }, [search, type, sort]);

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

  // Attach mock images and ratings for demo
  const resultsWithExtras = filtered.map((b, i) => ({
    ...b,
    image: getRandomImage(),
    rating: Number(getRandomRating()),
  }));

  return (
    <div className="min-h-screen gradient-professional p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 glass-effect gradient-card text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-white">
              Travel Booking
            </CardTitle>
            <CardDescription className="text-white/80">
              Find and book flights or hotels for your next trip.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="w-full">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 relative items-end w-full">
                {/* Destination Search */}
                <div className="w-full md:flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search destination..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                    autoComplete="off"
                    className="bg-white/10 text-white placeholder:text-white/60 border-white/20 focus:bg-white/20 w-full"
                  />
                  {showSuggestions && (
                    <ul className="absolute z-10 left-0 right-0 bg-slate-800 border border-slate-700 rounded shadow-md mt-1 max-h-48 overflow-y-auto text-white">
                      {suggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-900/40"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Date Pickers */}
                <div className="flex flex-col md:flex-row md:space-x-2 w-full md:w-auto">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white/10 text-white border-white/20 focus:bg-white/20 mb-2 md:mb-0 w-full md:w-36"
                    placeholder="Check-in/Departure"
                  />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white/10 text-white border-white/20 focus:bg-white/20 w-full md:w-36"
                    placeholder="Check-out/Return"
                  />
                </div>
                {/* Guests/Passengers Selector */}
                <div className="flex flex-col items-start w-full md:w-auto">
                  <label className="text-white/80 text-xs mb-1">
                    Guests/Passengers
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full md:w-20 bg-white/10 text-white border-white/20 focus:bg-white/20"
                  />
                </div>
                {/* Type Selector */}
                <div className="w-full md:w-auto">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="p-3 border rounded-lg bg-white/10 text-white border-white/20 w-full md:w-auto"
                  >
                    <option value="all">All</option>
                    <option value="flight">Flights</option>
                    <option value="hotel">Hotels</option>
                  </select>
                </div>
                <div className="w-full md:w-auto">
                  <Button className="bg-blue-500 text-white w-full md:w-auto mt-2 md:mt-0">
                    Search
                  </Button>
                </div>
              </div>
              {/* Sorting */}
              <div className="flex justify-end mt-4">
                <label className="text-white/80 mr-2">Sort by:</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="p-2 rounded bg-white/10 text-white border-white/20"
                >
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resultsWithExtras.length === 0 && (
            <div className="col-span-2 text-center text-white/70">
              No bookings found.
            </div>
          )}
          {resultsWithExtras.map((booking, idx) => (
            <Card
              key={booking.id}
              className="shadow-md glass-effect gradient-card text-white flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={booking.image}
                alt={booking.destination}
                className="w-full md:w-40 h-40 object-cover object-center rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                style={{ minWidth: 160 }}
              />
              <div className="flex-1 flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center justify-between">
                    <span>
                      {booking.type === "flight" ? "✈️ Flight" : "🏨 Hotel"} to{" "}
                      {booking.destination}
                    </span>
                    <span className="ml-2 bg-green-600/80 px-2 py-1 rounded text-xs font-bold">
                      {booking.rating} ★
                    </span>
                  </CardTitle>
                  <CardDescription className="text-white/80">
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
                  <Button className="bg-blue-500 text-white mt-2 w-full">
                    View Details
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
