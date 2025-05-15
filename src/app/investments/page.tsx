"use client";

import {
  Investment,
  InvestmentChartConfig,
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
import EditStatementDialog from "./edit-statement-dialog";
import CustomAlertDialog from "../utils/custom-alert-dialog";
import { Button } from "@/components/ui/button";
import { InvestmentsTable } from "./investments-table";
import { responseMessage } from "../utils/default-response-message";
import InvestmentDisplay from "./investment-display";
import "./investments.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useHttpService } from "@/hooks/use-http-service";
import { UseDemoService } from "@/hooks/use-demo-service";
import { useDemo } from "@/demo-context";

export default function Investments() {
  const { user } = useContextCheck();
  const httpService = useHttpService();
  const { isDemo } = useDemo();
  const demoService = UseDemoService();

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

  const [selectedInvestmentChartConfig, setSelectedInvestmentChartConfig] =
    useState<InvestmentChartConfig>();

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

  const [areInvestmentsLoading, setAreInvestmentsLoading] = useState(true);

  const fetchInvestments = async () => {
    setAreInvestmentsLoading(true);
    const investments: Investment[] = isDemo
      ? await demoService.fetchInvestments()
      : await httpService.get(`/api/investments?userId=${user!._id}`);
    setInvestments(investments);
    setSelectedInvestment(null);
    const chartConfig = investments.reduce<InvestmentChartConfig>(
      (acc, investment) => {
        const { brokerageName, color } = investment;
        const joinedBrokerageName = brokerageName.replace(/\s+/g, ""); // join on whitespace
        acc[joinedBrokerageName] = {
          label: brokerageName,
          color: color,
        };
        return acc;
      },
      {}
    );

    setSelectedInvestmentChartConfig(chartConfig);
    setAreInvestmentsLoading(false);
  };

  const fetchInvestmentChartData = async (investments: Investment[]) => {
    const investmentChartData = isDemo
      ? await demoService.fetchInvestmentChartData(investments)
      : await httpService.get<InvestmentChartData[]>(
          `/api/investments/chart-data?userId=${user!._id}`
        );
    setFetchedInvestmentChartData(investmentChartData);
    setSelectedInvestmentChartData(investmentChartData);
  };

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

  async function handleAddInvestment(
    formData:
      | z.infer<typeof investmentAddFormSchema> // param should only be of this type (workaround to fix type error)
      | z.infer<typeof statementAddFormSchema>
  ) {
    const response = isDemo
      ? demoService.addInvestment(
          formData as z.infer<typeof investmentAddFormSchema>
        )
      : await httpService.post(
          formData,
          `/api/investments?userId=${user?._id}`
        );
    if (response) {
      await responseMessage(response);
      fetchInvestments();
      setIsInvestmentAddDialogCarouselOpen(false);
    }
  }

  async function handleDeleteInvestment(investmentId: string) {
    const response = isDemo
      ? demoService.deleteInvestment(investmentId.toString())
      : await httpService.deleteRequest(
          `/api/investments?investmentId=${investmentId}`
        );
    if (response) {
      await responseMessage(response);
      fetchInvestments();
    }
  }

  async function handleAddStatement(
    formData:
      | z.infer<typeof statementAddFormSchema> // param should only be of this type (workaround to fix type error)
      | z.infer<typeof investmentAddFormSchema>
  ) {
    const response = isDemo
      ? demoService.addStatement(
          formData as z.infer<typeof statementAddFormSchema>,
          selectedInvestment?.investmentId as string
        )
      : await httpService.post(
          formData,
          `/api/investments/statements?investmentId=${selectedInvestment?.investmentId}`,
          "investments"
        );
    if (response) {
      await responseMessage(response);
      fetchInvestments();
      setIsStatementAddDialogCarouselOpen(false);
    }
  }

  // TODO: test if this works
  async function handleEditStatement(
    formData: z.infer<typeof statementEditFormSchema>
  ) {
    const response = isDemo
      ? demoService.updateStatement(formData)
      : await httpService.put(formData, "/api/investments/statements");
    if (response) {
      await responseMessage(response);
    }
  }

  // TODO: create this endpoint
  async function handleDeleteStatement(
    investmentId: string,
    statementId: string
  ) {
    const response = isDemo
      ? demoService.deleteStatement(investmentId, statementId)
      : await httpService.deleteRequest(
          `/api/investments/statements?investmentId=${investmentId}&statementId=${statementId}`
        );
    if (response) {
      await responseMessage(response);
    }
  }

  const handleAllClick = () => {
    setSelectedInvestmentChartData(fetchedInvestmentChartData);
    setSelectedInvestment(null);
  };

  const handleEditStatementTableClick = (tableStatement: TableStatement) => {
    setSelectedTableStatement(tableStatement);
    setIsEditStatementDialogOpen(true);
  };

  // TODO: promise all or the two useEffects below?
  // const fetchAllData = async () => {
  //   if (user) {
  //     await Promise.all([fetchInvestments(), fetchInvestmentChartData()]);
  //   }
  // };

  useEffect(() => {
    fetchInvestments();
  }, []);

  useEffect(() => {
    if (investments.length) {
      fetchInvestmentChartData(investments);
    }
  }, [investments]);

  let tableStatements: TableStatement[] = [];

  if (selectedInvestment) {
    tableStatements = investments
      .filter(
        (investment) => investment._id! === selectedInvestment.investmentId
      )
      .flatMap((investment) =>
        investment.statements.map((statement) => ({
          investmentId: investment._id!.toString(),
          brokerageName: investment.brokerageName,
          type: investment.type,
          subtype: investment.subtype,
          ...statement,
          _id: statement._id.toString(),
        }))
      );
  } else {
    tableStatements = investments.flatMap((investment) =>
      investment.statements.map((statement) => ({
        investmentId: investment._id!.toString(),
        brokerageName: investment.brokerageName,
        type: investment.type,
        subtype: investment.subtype,
        ...statement,
        _id: statement._id.toString(),
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

      {selectedTableStatement && isEditStatementDialogOpen && (
        <EditStatementDialog
          handleEdit={handleEditStatement}
          isOpen={isEditStatementDialogOpen}
          setIsOpen={setIsEditStatementDialogOpen}
          selectedTableStatement={selectedTableStatement}
          setSelectedTableStatement={setSelectedTableStatement}
        />
      )}
      <div className="investments-list-container rounded-scrollbar border">
        {areInvestmentsLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <InvestmentsList
            investments={investments}
            handleAllClick={handleAllClick}
            handleInvestmentCardClick={handleInvestmentCardClick}
            selectedInvestment={selectedInvestment}
            setIsInvestmentAddDialogCarouselOpen={
              setIsInvestmentAddDialogCarouselOpen
            }
          />
        )}
      </div>

      <div className="investment-display-container flex flex-col lg:flex-row w-full h-auto lg:h-[75%] border rounded-scrollbar">
        <div className="investments-display-container w-[100%] lg:m-10">
          {areInvestmentsLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <InvestmentDisplay
              selectedInvestmentsChartData={selectedInvestmentChartData}
              selectedInvestmentChartConfig={selectedInvestmentChartConfig}
              selectedInvestment={selectedInvestment}
            />
          )}
        </div>
        <div className="investment-add-delete-table-container w-full lg:w-1/2 h-auto p-4">
          {areInvestmentsLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <>
              <div className="investments-add-delete-container w-full h-auto p-4">
                <CustomAlertDialog
                  triggerText="Delete Investment"
                  title="Delete Investment?"
                  description="This action cannot be undone"
                  isTriggerDisabled={selectedInvestment === null}
                  triggerStyle={{
                    width: "40%",
                    height: "5em",
                    fontSize: "0.5em",
                  }}
                  onContinueClick={() =>
                    handleDeleteInvestment(selectedInvestment!.investmentId)
                  }
                />
                <Button
                  style={{ width: "40%", height: "5em", fontSize: "0.5em" }}
                  disabled={selectedInvestment === null}
                  onClick={() => setIsStatementAddDialogCarouselOpen(true)}
                >
                  Add Statement
                </Button>
              </div>
              <div className="investments-table-container">
                {investments.length && (
                  <InvestmentsTable
                    data={tableStatements}
                    handleEditStatementTableClick={
                      handleEditStatementTableClick
                    }
                    handleDeleteStatement={handleDeleteStatement}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
