"use client";

import {
  Investment,
  InvestmentChartData,
  SelectedInvestment,
} from "@/lib/models/investments";
import InvestmentsList from "./investments-list";
import { useContextCheck } from "@/use-context-check";
import { useEffect, useState } from "react";
import AddInvestmentDialogCarousel from "./add-dialog-carousel";
import AddStatementDialogCarousel from "./add-dialog-carousel";
import { z } from "zod";
import {
  investmentAddFormSchema,
  statementAddFormSchema,
} from "./form-schemas";
import { get, post } from "../utils/http-request-service";

export default function Investments() {
  const { user } = useContextCheck();

  const [investments, setInvestments] = useState<Investment[]>([]);

  const [fetchedInvestmentChartData, setFetchedInvestmentChartData] = useState<
    InvestmentChartData[]
  >([]);

  const [selectedInvestment, setSelectedInvestment] =
    useState<SelectedInvestment | null>(null);

  const [selectedInvestmentChartData, setSelectedInvestmentChartData] =
    useState<InvestmentChartData[]>();

  const [
    isInvestmentAddDialogCarouselOpen,
    setIsInvestmentAddDialogCarouselOpen,
  ] = useState<boolean>(false);

  const [
    isStatementAddDialogCarouselOpen,
    setIsStatementAddDialogCarouselOpen,
  ] = useState<boolean>(false);

  const handleInvestmentCardClick = (investment: Investment) => {
    const filteredInvestmentChartData = fetchedInvestmentChartData?.map(
      (chartData) => {
        return {
          month: chartData.month,
          [investment.brokerageName.replace(/\s+/g, "")]:
            chartData[investment.brokerageName.replace(/\s+/g, "")],
        };
      }
    );
    setSelectedInvestmentChartData(filteredInvestmentChartData);
    setSelectedInvestment({
      investmentId: investment._id!,
      brokerageName: investment.brokerageName,
      type: investment.type,
      subtype: investment.subtype,
    });
  };

  const fetchInvestments = async () => {
    const investments = await get(
      "/api/investments",
      "Failed to fetch investments"
    );
    setInvestments(investments);
  };

  // TODO: make sure this works
  async function handleAddInvestment(
    formData:
      | z.infer<typeof investmentAddFormSchema> // param should only be this type
      | z.infer<typeof statementAddFormSchema>
  ) {
    post(formData, "/api/investments");
  }

  // TODO: make sure this works
  async function handleAddStatement(
    formData:
      | z.infer<typeof statementAddFormSchema> // param should only be this type
      | z.infer<typeof investmentAddFormSchema>
  ) {
    post(formData, "/api/statements");
  }

  const handleAllClick = () => {
    setSelectedInvestmentChartData(fetchedInvestmentChartData);
    setSelectedInvestment(null);
  };

  useEffect(() => {
    if (user?._id) fetchInvestments();
  }, []);

  return (
    <div className="investments-page">
      <AddInvestmentDialogCarousel
        type="Investment"
        isAddDialogCarouselOpen={isInvestmentAddDialogCarouselOpen}
        setIsAddDialogCarouselOpen={setIsInvestmentAddDialogCarouselOpen}
        handleAdd={handleAddInvestment}
        header="Add Investment"
        subheader="Please follow along steps for adding an investment:"
      />
      <AddStatementDialogCarousel
        type="Statement"
        isAddDialogCarouselOpen={isStatementAddDialogCarouselOpen}
        setIsAddDialogCarouselOpen={setIsStatementAddDialogCarouselOpen}
        handleAdd={handleAddStatement}
        header="Add Statement"
        subheader="Please follow along steps for adding a statement:"
      />
      <div className="investments-list-container">
        <InvestmentsList
          investments={investments}
          handleAllClick={handleAllClick}
          handleInvestmentCardClick={handleInvestmentCardClick}
          selectedInvestment={selectedInvestment}
          setIsInvestmentAddDialogCarouselOpen={
            setIsInvestmentAddDialogCarouselOpen
          }
        />
      </div>
    </div>
  );
}
