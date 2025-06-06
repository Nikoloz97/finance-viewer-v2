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
import { initialDemoData } from "./lib/demo-data";
import { useRouter } from "next/navigation";

export interface DemoData {
  user: User;
  investments: Investment[];
}

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
  const router = useRouter();

  useEffect(() => {
    const isDemoMode = localStorage.getItem("demoMode") === "true";
    if (isDemoMode) {
      setIsDemo(true);
    }
  }, []);

  const startDemo = () => {
    setIsDemo(true);
    setDemoData(initialDemoData);
    localStorage.setItem("demoMode", "true");
    setUser(initialDemoData["user"]);
    router.push("/dashboard");
  };

  const exitDemo = () => {
    setIsDemo(false);
    localStorage.removeItem("demoMode");
    setUser(undefined);
    router.push("/");
  };

  // TODO: utilize this?? Or get rid of it
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

// TODO: implement something like this for userContext
export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
