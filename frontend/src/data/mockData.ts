import type {
  Account,
  Transaction,
  User,
  Goal,
  Booking,
} from "../types/banking";
import { faker } from "@faker-js/faker";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  ...Array.from({ length: 3 }).map((_, i) => ({
    id: `${i + 2}`,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
  })),
];

export const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Primary Checking",
    type: "checking",
    balance: 12450.75,
    accountNumber: "****1234",
    currency: "USD",
  },
  {
    id: "2",
    name: "High-Yield Savings",
    type: "savings",
    balance: 45892.23,
    accountNumber: "****5678",
    currency: "USD",
  },
  {
    id: "3",
    name: "Travel Credit Card",
    type: "credit",
    balance: -2341.87,
    accountNumber: "****9012",
    currency: "USD",
  },
  {
    id: "4",
    name: "Investment Portfolio",
    type: "investment",
    balance: 78234.19,
    accountNumber: "****3456",
    currency: "USD",
  },
  ...Array.from({ length: 6 }).map((_, i) => ({
    id: `${i + 5}`,
    name: faker.finance.accountName(),
    type: faker.helpers.arrayElement([
      "checking",
      "savings",
      "credit",
      "investment",
    ]) as "checking" | "savings" | "credit" | "investment",
    balance: faker.number.float({ min: -5000, max: 100000, precision: 0.01 }),
    accountNumber: `****${faker.finance.accountNumber().slice(-4)}`,
    currency: "USD",
  })),
];

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    type: "debit",
    amount: -89.43,
    description: "Starbucks Coffee",
    category: "Food & Dining",
    date: new Date("2024-06-20"),
    pending: false,
  },
  {
    id: "2",
    accountId: "1",
    type: "credit",
    amount: 3200.0,
    description: "Salary Deposit",
    category: "Income",
    date: new Date("2024-06-19"),
    pending: false,
  },
  {
    id: "3",
    accountId: "1",
    type: "debit",
    amount: -1250.0,
    description: "Rent Payment",
    category: "Housing",
    date: new Date("2024-06-18"),
    pending: false,
  },
  {
    id: "4",
    accountId: "2",
    type: "credit",
    amount: 500.0,
    description: "Transfer from Checking",
    category: "Transfer",
    date: new Date("2024-06-17"),
    pending: false,
  },
  {
    id: "5",
    accountId: "3",
    type: "debit",
    amount: -156.78,
    description: "Amazon Purchase",
    category: "Shopping",
    date: new Date("2024-06-16"),
    pending: true,
  },
  {
    id: "6",
    accountId: "1",
    type: "debit",
    amount: -45.2,
    description: "Gas Station",
    category: "Transportation",
    date: new Date("2024-06-15"),
    pending: false,
  },
  ...Array.from({ length: 14 }).map((_, i) => {
    const accountId = faker.helpers.arrayElement(mockAccounts).id;
    return {
      id: `${i + 7}`,
      accountId,
      type: faker.helpers.arrayElement(["debit", "credit"]) as
        | "debit"
        | "credit",
      amount: faker.number.float({ min: -2000, max: 5000, precision: 0.01 }),
      description: faker.commerce.productName(),
      category: faker.commerce.department(),
      date: faker.date.recent({ days: 30 }),
      pending: faker.datatype.boolean(),
    };
  }),
];

export const mockGoals: Goal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 8500,
    targetDate: new Date("2024-12-31"),
    category: "Emergency",
  },
  {
    id: "2",
    name: "European Vacation",
    targetAmount: 5000,
    currentAmount: 2100,
    targetDate: new Date("2024-08-15"),
    category: "Travel",
  },
  {
    id: "3",
    name: "New Car Down Payment",
    targetAmount: 8000,
    currentAmount: 3200,
    targetDate: new Date("2025-03-01"),
    category: "Transportation",
  },
  ...Array.from({ length: 4 }).map((_, i) => ({
    id: `${i + 4}`,
    name: faker.word.words({ count: { min: 2, max: 4 } }),
    targetAmount: faker.number.int({ min: 1000, max: 20000 }),
    currentAmount: faker.number.int({ min: 0, max: 15000 }),
    targetDate: faker.date.future({ years: 2 }),
    category: faker.helpers.arrayElement([
      "Travel",
      "Emergency",
      "Education",
      "Home",
      "Transportation",
      "Leisure",
    ]),
  })),
];

const allAmenities = [
  "WiFi",
  "Breakfast",
  "Pool",
  "Parking",
  "Gym",
  "Spa",
  "Free Cancellation",
  "Bar",
  "Pet Friendly",
  "Airport Shuttle",
  "Restaurant",
  "Laundry Service",
];

function generateMockBookings(count: number) {
  const bookings = [];
  for (let i = 0; i < count; i++) {
    const user = faker.helpers.arrayElement(mockUsers);
    const type = faker.helpers.arrayElement(["flight", "hotel"]) as
      | "flight"
      | "hotel";
    const destination = faker.location.city() + ", " + faker.location.country();
    const startDate = faker.date.soon({ days: 60 });
    const endDate = faker.date.soon({ days: 90, refDate: startDate });
    const amount = faker.number.float({ min: 100, max: 3000, precision: 0.01 });
    const status = faker.helpers.arrayElement([
      "booked",
      "cancelled",
      "completed",
    ]) as "booked" | "cancelled" | "completed";
    const notes = faker.lorem.sentences({ min: 1, max: 3 });
    const rating = faker.number.float({ min: 3, max: 5, precision: 0.1 });
    const thumbnail = faker.image.urlPicsumPhotos({ width: 400, height: 300 });
    let hotelName = undefined;
    let airline = undefined;
    let amenities = undefined;
    if (type === "hotel") {
      hotelName = faker.company.name() + " Hotel";
      amenities = faker.helpers.arrayElements(allAmenities, { min: 2, max: 7 });
    } else {
      airline = faker.company.name() + " Airlines";
    }
    bookings.push({
      id: faker.string.uuid(),
      userId: user.id,
      type,
      destination,
      startDate,
      endDate,
      amount,
      status,
      notes,
      rating,
      thumbnail,
      hotelName,
      airline,
      amenities,
    });
  }
  return bookings;
}

export const mockBookings = generateMockBookings(200);
