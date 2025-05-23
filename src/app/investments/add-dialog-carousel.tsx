import {
  NewInvestment,
  AddStatementFormData,
  ParsedInvestmentData,
} from "@/lib/models/investments";
import { useState } from "react";
import AutomaticFileDrop from "./automatic-file-drop";
import InvestmentAddForm from "./investment-add-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import StatementAddForm from "./statement-add-form";
import "./investments.css";

interface AddDialogCarouselProps {
  isAddDialogCarouselOpen: boolean;
  handleAdd: (newData: NewInvestment | AddStatementFormData) => void;
  setIsAddDialogCarouselOpen: (isOpen: boolean) => void;
  type: "Statement" | "Investment";
  header: string;
  subheader: string;
}

export default function AddDialogCarousel({
  isAddDialogCarouselOpen,
  handleAdd,
  setIsAddDialogCarouselOpen,
  type,
  header,
  subheader,
}: AddDialogCarouselProps) {
  const [isManualChosen, setIsManualChosen] = useState(false);
  const [isAutomaticChosen, setIsAutomaticChosen] = useState(false);
  const [parsedInvestmentData, setParsedInvestmentData] = useState<
    ParsedInvestmentData | undefined
  >();

  const handleManualButtonClick = () => {
    setIsManualChosen(true);
    setIsAutomaticChosen(false);
  };

  const handleAutomaticButtonClick = () => {
    setIsAutomaticChosen(true);
    setIsManualChosen(false);
  };

  // TODO: remove once automatic created
  const addSteps = [];

  // TODO: uncomment once automatic created
  // const addSteps = [
  //   <div className="flex gap-4">
  //     <Button onClick={handleManualButtonClick} disabled={isManualChosen}>
  //       Manual
  //     </Button>
  //     <Button onClick={handleAutomaticButtonClick} disabled={isAutomaticChosen}>
  //       Automatic
  //     </Button>
  //   </div>,
  // ];

  if (isAutomaticChosen) {
    addSteps.push(
      <AutomaticFileDrop setParsedInvestmentData={setParsedInvestmentData} />
    );
  }

  if (type === "Investment") {
    if (parsedInvestmentData) {
      addSteps.push(
        <InvestmentAddForm
          parsedData={parsedInvestmentData}
          handleAdd={handleAdd}
        />
      );
    } else if (isManualChosen) {
      addSteps.push(<InvestmentAddForm handleAdd={handleAdd} />);
    }
    // TODO: remove once automatic created
    addSteps.push(<InvestmentAddForm handleAdd={handleAdd} />);
  } else if (type === "Statement") {
    if (parsedInvestmentData) {
      addSteps.push(
        <StatementAddForm
          parsedData={parsedInvestmentData}
          handleAdd={handleAdd}
        />
      );
    } else if (isManualChosen) {
      addSteps.push(<StatementAddForm handleAdd={handleAdd} />);
    }
    // TODO: remove once automatic created
    addSteps.push(<StatementAddForm handleAdd={handleAdd} />);
  }

  return (
    <Dialog
      open={isAddDialogCarouselOpen}
      onOpenChange={setIsAddDialogCarouselOpen}
    >
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="dark w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg overflow-y-auto max-h-[90vh] rounded-lg p-4 sm:p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-4xl">{header}</DialogTitle>
          <DialogDescription className="text-white text-lg">
            {subheader}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full flex justify-center px-10">
          <Carousel>
            <CarouselContent>
              {addSteps.map((step, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 h-full w-full">
                    <Card>
                      <CardContent className="flex h-full w-full aspect-square items-center justify-center p-12">
                        {step}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
