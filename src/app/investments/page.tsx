"use client";

import { Investment } from "@/lib/models/investments";
import InvestmentsList from "./investmentsList";
import { UseContextCheck } from "@/usecontextcheck";
import { useEffect, useState } from "react";

export default function Investments() {
  // const { user } = UseContextCheck();

  const [investments, setInvestments] = useState<Investment[]>([]);

  const fetchInvestments = async () => {
    // if (user?._id) {
    const response = await fetch(`/api/investments`);

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    const data = await response.json();
    setInvestments(data);
    // }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div className="Investments-List-Container">
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
  );
}
