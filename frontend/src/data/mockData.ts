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
  ...mockUsers.flatMap((user, userIdx) =>
    Array.from({ length: 3 }).map((_, i) => ({
      id: `${user.id}-${i + 1}`,
      userId: user.id,
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
    }))
  ),
];

export const mockTransactions: Transaction[] = mockAccounts.flatMap((account) =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: `${account.id}-tx-${i + 1}`,
    userId: account.userId,
    accountId: account.id,
    type: faker.helpers.arrayElement(["debit", "credit"]) as "debit" | "credit",
    amount: faker.number.float({ min: -2000, max: 5000, precision: 0.01 }),
    description: faker.commerce.productName(),
    category: faker.commerce.department(),
    date: faker.date.recent({ days: 30 }),
    pending: faker.datatype.boolean(),
  }))
);

export const mockGoals: Goal[] = mockUsers.flatMap((user) =>
  Array.from({ length: 2 }).map((_, i) => ({
    id: `${user.id}-goal-${i + 1}`,
    userId: user.id,
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
  }))
);

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
