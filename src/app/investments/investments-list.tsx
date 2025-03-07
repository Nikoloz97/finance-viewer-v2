"use client";

import { Investment, SelectedInvestment } from "@/lib/models/investments";
import { Plus } from "lucide-react";
import ComingSoonOverlay from "../utils/coming-soon-overlay/coming-soon-overlay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./investments.css";

interface InvestmentsListProps {
  investments: Investment[];
  handleAllClick: () => void;
  handleInvestmentCardClick: (investment: Investment) => void;
  selectedInvestment: SelectedInvestment | null;
  setIsInvestmentAddDialogCarouselOpen: (isOpen: boolean) => void;
}

export default function InvestmentsList({
  investments,
  handleAllClick,
  handleInvestmentCardClick,
  selectedInvestment,
  setIsInvestmentAddDialogCarouselOpen,
}: InvestmentsListProps) {
  return (
    <>
      <ComingSoonOverlay
        containerStyle={{ width: "60%", padding: "0.3em" }}
        overlayTextStyle={{ fontSize: "1em" }}
      >
        <div className="investment-filters-container">
          <h3 className="mb-0">Filter: </h3>
          <Badge className="dark">All</Badge>
          <Badge>Stocks</Badge>
          <Badge>Savings</Badge>
          <Badge>Crypto</Badge>
          <Badge>Bonds</Badge>
          <Badge>Retirement</Badge>
        </div>
      </ComingSoonOverlay>

      <div className="investments-list-rectangle">
        <Button
          onClick={() => setIsInvestmentAddDialogCarouselOpen(true)}
          className="add-investment-button text-white"
        >
          <Plus />
        </Button>
        <Button
          className={`add-investment-button text-white ${
            selectedInvestment ? "" : "selected-investment-card"
          }`}
          onClick={handleAllClick}
        >
          All
        </Button>
        {investments.map((investment, index) => (
          <Button
            key={index}
            asChild
            className={`border-none text-white ${
              selectedInvestment
                ? selectedInvestment.investmentId === investment._id
                  ? "selected-investment-card"
                  : ""
                : ""
            }`}
            onClick={() => handleInvestmentCardClick(investment)}
          >
            <Card className="investment-card">
              <CardHeader>
                <CardTitle>{investment.brokerageName}</CardTitle>
                <CardDescription>{`${investment.type} ${
                  investment.subtype ? `(${investment.subtype})` : ""
                }`}</CardDescription>
              </CardHeader>
            </Card>
          </Button>
        ))}
      </div>
    </>
  );
}
