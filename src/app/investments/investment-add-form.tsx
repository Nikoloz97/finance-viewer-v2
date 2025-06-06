"use client";

import { NewInvestment, ParsedInvestmentData } from "@/lib/models/investments";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { brokerages } from "@/lib/brokerages";
import { colors } from "@/lib/colors";
import { investmentAddFormSchema } from "./form-schemas";
import "./investments.css";
import { useState } from "react";

type InvestmentAddFormProps = {
  parsedData?: ParsedInvestmentData;
  handleAdd: (newInvestment: NewInvestment) => void;
};

export default function InvestmentAddForm({
  parsedData,
  handleAdd,
}: InvestmentAddFormProps) {
  // TODO: work on adding this check back in
  // Min + max possible value for type int32
  //   const MIN_INT32 = -(2 ** 31);
  //   const MAX_INT32 = 2 ** 31;

  const investmentTypes = [
    "Stocks",
    "Savings",
    "Crypto",
    "Bonds",
    "Retirement",
  ];

  const investmentSubtypes = ["Individual", "ETF"];

  const form = useForm<z.infer<typeof investmentAddFormSchema>>({
    resolver: zodResolver(investmentAddFormSchema),
    defaultValues: parsedData
      ? {
          brokerageName: parsedData.brokerageName,
          type: parsedData.type,
          subtype: parsedData.subtype,
          startDate: parsedData.startDate,
          startBalance: parsedData.startBalance,
          endDate: parsedData.endDate,
          endBalance: parsedData.endBalance,
          depositAmount: parsedData.depositAmount,
          withdrawalAmount: parsedData.withdrawalAmount,
        }
      : {
          brokerageName: "",
          type: "",
          subtype: "",
          color: "",
          startDate: new Date(),
          startBalance: 0,
          endDate: new Date(),
          endBalance: 0,
          depositAmount: 0,
          withdrawalAmount: 0,
        },
  });

  // TODO: remove? (this was in the handleSubmit function of form)
  // async function onSubmit(formData: z.infer<typeof investmentAddFormSchema>) {
  //   try {
  //     const response = await fetch(`/api/investments`, {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //     });
  //   } catch (error) {
  //     console.error();
  //   }
  // }

  const [isBrokerageOpen, setIsBrokerageOpen] = useState(false);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)}>
          <div className="add-investment-grid-container">
            <FormField
              control={form.control}
              name="brokerageName"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Brokerage</FormLabel>
                  <Popover
                    open={isBrokerageOpen}
                    onOpenChange={setIsBrokerageOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "flex text-start w-[200px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <span className="flex-1 min-w-0 truncate">
                            {field.value
                              ? brokerages.find(
                                  (brokerage) => brokerage === field.value
                                )
                              : "Select brokerage"}
                          </span>
                          <ChevronsUpDown />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0 pointer-events-auto"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      <Command className="pointer-events-auto">
                        <div className="pointer-events-auto focus-within:outline-none">
                          <CommandInput
                            placeholder="Search brokerage..."
                            className="h-9 pointer-events-auto border-red-500"
                          />
                        </div>
                        <CommandList>
                          <CommandEmpty>No brokerage found.</CommandEmpty>
                          <CommandGroup>
                            {brokerages.map((brokerage) => (
                              <CommandItem
                                className="cursor-pointer"
                                value={brokerage}
                                key={brokerage}
                                onSelect={() => {
                                  form.setValue("brokerageName", brokerage);
                                }}
                              >
                                {brokerage}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    brokerage === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.label} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Investment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {investmentTypes.map((investmentType, index) => (
                        <SelectItem key={index} value={investmentType}>
                          {investmentType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtype"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Investment Subtype</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a Subtype" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {investmentSubtypes.map((investmentSubtype, index) => (
                        <SelectItem key={index} value={investmentSubtype}>
                          {investmentSubtype}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Statement Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DayPicker
                        className="p-3"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        classNames={{
                          day_disabled: "text-gray-400 opacity-50",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Balance</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormLabel>Statement End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DayPicker
                        className="p-3"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        classNames={{
                          day_disabled: "text-gray-400 opacity-50",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Balance</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depositAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="withdrawalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Withdrawal Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="add-investment-button-container">
            <Button className="dark" type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
