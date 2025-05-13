"use client";

import "./dashboard.css";
import Trends from "./trends";
import Networth from "./networth";
import Profile from "./profile";
import FinancialCalendar from "./financial-calendar";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex flex-col md:flex-row gap-5 h-full md:h-1/2">
        <div className="flex flex-1 justify-center items-center bg-primary-background rounded-md p-2 border">
          <Networth />
        </div>
        <div className="flex md:w-[30%] justify-center items-center bg-primary-background rounded-md border">
          <Profile />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 h-full md:h-1/2">
        <div className="flex flex-1 justify-center items-center bg-primary-background rounded-md border">
          <FinancialCalendar />
        </div>
        <div className="flex flex-1 justify-center items-center bg-primary-background rounded-md border">
          <Trends />
        </div>
      </div>
    </div>
  );
}
