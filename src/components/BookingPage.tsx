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
import { useState, useEffect, useRef } from "react";

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

const amenitiesList = ["WiFi", "Breakfast", "Pool", "Parking"];

type BookingWithExtras = Booking & {
  image: string;
  rating: number;
  thumbnail?: string;
  hotelName?: string;
  airline?: string;
};

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
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 3000]);
  const [minRating, setMinRating] = useState(3);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingWithExtras | null>(null);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  React.useEffect(() => {
    let results = mockBookings;
    if (type !== "all") results = results.filter((b) => b.type === type);
    if (search)
      results = results.filter((b) =>
        b.destination.toLowerCase().includes(search.toLowerCase())
      );
    // Filter by price
    results = results.filter(
      (b) => b.amount >= priceRange[0] && b.amount <= priceRange[1]
    );
    // Filter by rating
    results = results.filter((b) => b.rating >= minRating);
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      results = results.filter((b) =>
        selectedAmenities.every((a) =>
          b.notes?.toLowerCase().includes(a.toLowerCase())
        )
      );
    }
    // Filter by free cancellation (mock: if notes include 'free cancellation')
    if (freeCancellation) {
      results = results.filter((b) =>
        b.notes?.toLowerCase().includes("free cancellation")
      );
    }
    // Sorting
    results = [...results].sort((a, b) => {
      if (sort === "price") return a.amount - b.amount;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
    setFiltered(results);
  }, [
    search,
    type,
    sort,
    priceRange,
    minRating,
    selectedAmenities,
    freeCancellation,
  ]);

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
  const resultsWithExtras: BookingWithExtras[] = filtered.map((b, i) => ({
    ...b,
    image: (b as any).thumbnail || getRandomImage(),
    rating: (b as any).rating || Number(getRandomRating()),
    thumbnail: (b as any).thumbnail,
    hotelName: (b as any).hotelName,
    airline: (b as any).airline,
  }));

  return (
    <div className="min-h-screen gradient-professional p-2 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
          <div className="bg-slate-900 glass-effect rounded-xl shadow-2xl w-full max-w-lg mx-2 sm:mx-4 p-2 sm:p-6 relative animate-bounce-in overflow-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/80 hover:text-white text-2xl font-bold"
              onClick={() => setSelectedBooking(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={selectedBooking.thumbnail || selectedBooking.image}
              alt={selectedBooking.destination}
              className="w-full h-40 sm:h-48 object-cover object-center rounded-lg mb-4"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex-1">
                {selectedBooking.type === "flight" ? "✈️ Flight" : "🏨 Hotel"}{" "}
                to {selectedBooking.destination}
              </h2>
              <span className="ml-0 sm:ml-2 bg-green-600/80 px-2 py-1 rounded text-xs font-bold">
                {selectedBooking.rating} ★
              </span>
            </div>
            {selectedBooking.hotelName && (
              <div className="text-white/80 mb-1 font-semibold break-words">
                {selectedBooking.hotelName}
              </div>
            )}
            {selectedBooking.airline && (
              <div className="text-white/80 mb-1 font-semibold break-words">
                {selectedBooking.airline}
              </div>
            )}
            <div className="text-white/80 mb-2">
              {new Date(selectedBooking.startDate).toLocaleDateString()} -{" "}
              {new Date(selectedBooking.endDate).toLocaleDateString()}
            </div>
            <div className="mb-2 text-white">
              <span className="font-semibold">Amount:</span> $
              {selectedBooking.amount.toFixed(2)}
            </div>
            <div className="mb-2 text-white">
              <span className="font-semibold">Status:</span>{" "}
              <span className="capitalize">{selectedBooking.status}</span>
            </div>
            <div className="mb-2 text-white break-words">
              <span className="font-semibold">Notes:</span>{" "}
              {selectedBooking.notes}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-white">Amenities:</span>
              <ul className="flex flex-wrap gap-2 mt-2">
                {amenitiesList.map((a) => (
                  <li
                    key={a}
                    className={`px-3 py-1 rounded-full border text-xs font-medium ${
                      selectedBooking.notes
                        ?.toLowerCase()
                        .includes(a.toLowerCase())
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white/10 border-white/20 text-white/60"
                    }`}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="bg-blue-500 text-white w-full"
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Drawer Overlay for mobile/tablet */}
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setDrawerOpen(false)}
          />
        )}
        {/* Sidebar/Drawer Filters */}
        <aside className="w-full lg:w-64 mb-4 lg:mb-0">
          {/* Mobile/Tablet: Drawer */}
          <div className="lg:hidden mb-4">
            <Button
              type="button"
              className="bg-blue-500 text-white w-full"
              onClick={() => setDrawerOpen(true)}
            >
              Filters
            </Button>
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-72 bg-slate-900 glass-effect rounded-r-lg p-4 sm:p-6 text-white z-50 transform transition-transform duration-300 lg:static lg:transform-none lg:w-64 lg:bg-white/10 lg:rounded-lg lg:shadow-none lg:p-6 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:block`}
            style={{ maxWidth: 320 }}
          >
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <span className="text-lg font-bold">Filters</span>
              <Button
                type="button"
                className="bg-blue-500 text-white"
                onClick={() => setDrawerOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="space-y-8">
              {/* Price Range Slider */}
              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Price Range (${priceRange[0]} - ${priceRange[1]})
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={10}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full accent-blue-500"
                  />
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    step={10}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full accent-blue-500"
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>$100</span>
                  <span>$3000</span>
                </div>
              </div>
              {/* Star Rating Buttons */}
              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Minimum Rating
                </label>
                <div className="flex flex-wrap gap-2 max-w-full">
                  {[3, 3.5, 4, 4.5, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`px-3 py-1 rounded-full border text-sm font-bold transition-all ${
                        minRating === r
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white/10 border-white/20 text-white/80 hover:bg-blue-600/30"
                      }`}
                      onClick={() => setMinRating(r)}
                      style={{ minWidth: 56 }}
                    >
                      {r} ★
                    </button>
                  ))}
                </div>
              </div>
              {/* Amenities as pill buttons */}
              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${
                        selectedAmenities.includes(a)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "bg-white/10 border-white/20 text-white/80 hover:bg-blue-600/30"
                      }`}
                      onClick={() =>
                        setSelectedAmenities(
                          selectedAmenities.includes(a)
                            ? selectedAmenities.filter((am) => am !== a)
                            : [...selectedAmenities, a]
                        )
                      }
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              {/* Free Cancellation Toggle */}
              <div className="flex items-center space-x-3">
                <label className="font-semibold text-white/80">
                  Free Cancellation
                </label>
                <button
                  type="button"
                  className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
                    freeCancellation ? "bg-blue-500" : "bg-white/20"
                  }`}
                  onClick={() => setFreeCancellation((v) => !v)}
                  aria-pressed={freeCancellation}
                >
                  <span
                    className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      freeCancellation ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content */}
        <div className="flex-1 w-full overflow-x-auto">
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
                  src={booking.thumbnail || booking.image}
                  alt={booking.destination}
                  className="w-full md:w-40 h-40 object-cover object-center rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                  style={{ minWidth: 160 }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center justify-between">
                      <span>
                        {booking.type === "flight" ? "✈️ Flight" : "🏨 Hotel"}{" "}
                        to {booking.destination}
                      </span>
                      <span className="ml-2 bg-green-600/80 px-2 py-1 rounded text-xs font-bold">
                        {booking.rating} ★
                      </span>
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      {booking.hotelName && (
                        <span className="font-semibold mr-2">
                          {booking.hotelName}
                        </span>
                      )}
                      {booking.airline && (
                        <span className="font-semibold mr-2">
                          {booking.airline}
                        </span>
                      )}
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
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
                    <Button
                      className="bg-blue-500 text-white mt-2 w-full"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
