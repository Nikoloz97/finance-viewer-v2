"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { User } from "./lib/models/user";

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isUserSignedIn: boolean;
  setIsUserSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
  isMonitor: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1444px)",
  });

  const isMonitor = useMediaQuery({
    query: "(min-width: 1600px)",
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isUserSignedIn,
        setIsUserSignedIn,
        isDesktop,
        isMonitor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
