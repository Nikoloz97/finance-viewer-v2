"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "./lib/models/user";
import { Investment } from "./lib/models/investments";
import { useContextCheck } from "./use-context-check";

// TODO: move this to models directory
export interface DemoData {
  user: User;
  investments: Investment[];
}

// TODO: move this to a file in lib directory
// TODO: fix _id hard-coding
const initialDemoData: DemoData = {
  user: {
    _id: "demo-user-1",
    username: "Demo User",
    password: "demo-password",
    email: "demo@example.com",
    firstName: "Alex",
    lastName: "Smith",
    occupation: "Software Engineer",
    profileImagePath: null,
  },
  investments: [
    {
      _id: "demo-investment-id",
      userId: "demo-user-1",
      brokerageName: "Vanguard",
      type: "Stocks",
      subtype: "ETF",
      color: "#EF5350",
      statements: [
        {
          _id: "demo-statement-id-1",
          startDate: new Date("2025-02-01T05:00:00.000Z"),
          startBalance: 3324.72,
          endDate: new Date("2025-02-28T05:00:00.000+00:00"),
          endBalance: 3261.94,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-2",
          startDate: new Date("2025-03-01T05:00:00.000+00:00"),
          startBalance: 3261.94,
          endDate: new Date("2025-03-31T04:00:00.000+00:00"),
          endBalance: 3071.49,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-3",
          startDate: new Date("2025-04-01T04:00:00.000+00:00"),
          startBalance: 3071.49,
          endDate: new Date("2025-04-30T04:00:00.000+00:00"),
          endBalance: 3048.92,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
      ],
    },
    {
      _id: "demo-investment-id-2",
      userId: "demo-user-1",
      brokerageName: "Fidelity",
      type: "Stocks",
      subtype: "Individual",
      color: "#81C784",
      statements: [
        {
          _id: "demo-statement-id-4",
          startDate: new Date("2025-01-01T05:00:00.000Z"),
          startBalance: 2855.25,
          endDate: new Date("2025-01-31T05:00:00.000+00:00"),
          endBalance: 2855.25,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-5",
          startDate: new Date("2025-02-01T05:00:00.000+00:00"),
          startBalance: 2855.25,
          endDate: new Date("2025-02-28T05:00:00.000+00:00"),
          endBalance: 2855.25,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-6",
          startDate: new Date("2025-03-01T05:00:00.000+00:00"),
          startBalance: 2855.25,
          endDate: new Date("2025-03-31T04:00:00.000+00:00"),
          endBalance: 2725.59,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-7",
          startDate: new Date("2025-04-01T04:00:00.000+00:00"),
          startBalance: 2725.59,
          endDate: new Date("2025-04-30T04:00:00.000+00:00"),
          endBalance: 2725.59,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
      ],
    },
    {
      _id: "demo-investment-id-3",
      userId: "demo-user-1",
      brokerageName: "Webull",
      type: "Stocks",
      subtype: "Individual",
      color: "#4FC3F7",
      statements: [
        {
          _id: "demo-statement-id-8",
          startDate: new Date("2024-12-31T05:00:00.000Z"),
          startBalance: 8559.66,
          endDate: new Date("2025-01-31T05:00:00.000+00:00"),
          endBalance: 8626.71,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-9",
          startDate: new Date("2025-01-31T05:00:00.000+00:00"),
          startBalance: 8647.57,
          endDate: new Date("2025-02-28T05:00:00.000+00:00"),
          endBalance: 8354.4,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-10",
          startDate: new Date("2025-02-28T05:00:00.000+00:00"),
          startBalance: 8376.58,
          endDate: new Date("2025-03-31T04:00:00.000+00:00"),
          endBalance: 7597.77,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
        {
          _id: "demo-statement-id-11",
          startDate: new Date("2025-03-31T04:00:00.000+00:00"),
          startBalance: 7597.77,
          endDate: new Date("2025-04-30T04:00:00.000+00:00"),
          endBalance: 7652.45,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
      ],
    },
  ],
};

interface DemoContextType {
  isDemo: boolean;
  demoData: DemoData;
  startDemo: () => void;
  exitDemo: () => void;
  updateDemoData: <K extends keyof DemoData>(
    key: K,
    newData: DemoData[K]
  ) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);
  const [demoData, setDemoData] = useState<DemoData>(initialDemoData);
  const { setUser } = useContextCheck();

  useEffect(() => {
    const isDemoMode = localStorage.getItem("demoMode") === "true";
    if (isDemoMode) {
      setIsDemo(true);
    }

    // TODO: remove? (alternative to checking local storage)
    // const urlParams = new URLSearchParams(window.location.search);
    // if (urlParams.get("demo") === "true") {
    //   setIsDemo(true);
    //   localStorage.setItem("demoMode", "true");
    // }
  }, []);

  const startDemo = () => {
    setIsDemo(true);
    setDemoData(initialDemoData);
    localStorage.setItem("demoMode", "true");
    setUser(initialDemoData["user"]);
  };

  const exitDemo = () => {
    setIsDemo(false);
    localStorage.removeItem("demoMode");
    setUser(undefined);
  };

  const updateDemoData = <K extends keyof DemoData>(
    key: K,
    newData: DemoData[K]
  ) => {
    setDemoData((prevData) => ({
      ...prevData,
      [key]: newData,
    }));
  };

  return (
    <DemoContext.Provider
      value={{
        isDemo,
        demoData,
        startDemo,
        exitDemo,
        updateDemoData,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
