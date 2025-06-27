import React, { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockData";
import type { User } from "../types/banking";

interface UserContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, users: mockUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
