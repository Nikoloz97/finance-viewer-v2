"use client";

import { Investment } from "@/lib/models/investments";
import InvestmentsList from "./investmentsList";
import { UseContextCheck } from "@/usecontextcheck";
import { useEffect, useState } from "react";

export default function Investments() {
  const { user } = UseContextCheck();

  const [investments, setInvestments] = useState<Investment[]>([]);

  const fetchInvestments = async () => {
    const response = await fetch(`/api/investments`);

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    const data = await response.json();
    setInvestments(data);
  };

  useEffect(() => {
    if (user?._id) fetchInvestments();
  }, []);

  return (
    <div className="investments-page">
      <div className="investments-list-container">
        <InvestmentsList
          investments={investments}
          // handleAllClick={handleAllClick}
          // handleInvestmentCardClick={handleInvestmentCardClick}
          // selectedInvestment={selectedInvestment}
          // setIsInvestmentAddDialogCarouselOpen={
          //   setIsInvestmentAddDialogCarouselOpen
          // }
        />
      </div>
    </div>
  );
}
