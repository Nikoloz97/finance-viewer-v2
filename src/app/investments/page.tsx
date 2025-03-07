"use client";

import {
  Investment,
  InvestmentChartData,
  SelectedInvestment,
  TableStatement,
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
  statementEditFormSchema,
} from "./form-schemas";
import { get, post } from "../utils/http-request-service";
import EditStatementDialog from "./edit-statement-dialog";

export default function Investments() {
  const { user } = useContextCheck();

  const [investments, setInvestments] = useState<Investment[]>([]);

  const [fetchedInvestmentChartData, setFetchedInvestmentChartData] = useState<
    InvestmentChartData[]
  >([]);

  const [selectedInvestment, setSelectedInvestment] =
    useState<SelectedInvestment | null>(null);

  const [selectedTableStatement, setSelectedTableStatement] =
    useState<TableStatement | null>(null);

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

  const [isEditStatementDialogOpen, setIsEditStatementDialogOpen] =
    useState<boolean>(false);

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
      `/api/investments?userId=${user?._id}`,
      "Failed to fetch investments"
    );
    setInvestments(investments);
  };

  async function handleAddInvestment(
    formData:
      | z.infer<typeof investmentAddFormSchema> // param should only be of this type (workaround to fix type error)
      | z.infer<typeof statementAddFormSchema>
  ) {
    post(formData, `/api/investments?userId=${user?._id}`);
  }

  // TODO: test if this works
  async function handleAddStatement(
    formData:
      | z.infer<typeof statementAddFormSchema> // param should only be of this type (workaround to fix type error)
      | z.infer<typeof investmentAddFormSchema>
  ) {
    post(formData, "/api/statements");
  }

  // TODO: test if this works
  async function handleEditStatement(
    formData: z.infer<typeof statementEditFormSchema>
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

  let tableStatements: TableStatement[] | null = null;

  if (selectedInvestment) {
    tableStatements = investments
      .filter(
        (investment) => investment._id === selectedInvestment.investmentId
      )
      .flatMap((investment) =>
        investment.statements.map((statement) => ({
          investmentId: investment._id!,
          brokerageName: investment.brokerageName,
          type: investment.type,
          subtype: investment.subtype,
          ...statement,
        }))
      );
  } else {
    tableStatements = investments.flatMap((investment) =>
      investment.statements.map((statement) => ({
        investmentId: investment._id!,
        brokerageName: investment.brokerageName,
        type: investment.type,
        subtype: investment.subtype,
        ...statement,
      }))
    );
  }

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

      {selectedTableStatement && (
        <EditStatementDialog
          handleEdit={handleEditStatement}
          isOpen={isEditStatementDialogOpen}
          setIsOpen={setIsEditStatementDialogOpen}
          selectedTableStatement={selectedTableStatement}
          setSelectedTableStatement={setSelectedTableStatement}
        />
      )}
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
