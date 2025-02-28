"use client";

import { Investment } from "@/lib/models/investments";
import InvestmentsList from "./investments-list";
import { useContextCheck } from "@/use-context-check";
import { useEffect, useState } from "react";
import InvestmentAddDialogCarousel from "./investment-add-dialog-carousel";

export default function Investments() {
  const { user } = useContextCheck();

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
      <InvestmentAddDialogCarousel />
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
