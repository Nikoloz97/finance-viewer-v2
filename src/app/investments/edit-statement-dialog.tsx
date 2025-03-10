import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EditTableStatementFormData,
  TableStatement,
} from "@/lib/models/investments";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { statementEditFormSchema } from "./form-schemas";

interface EditStatementDialogProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  selectedTableStatement: TableStatement;
  setSelectedTableStatement: (statement: TableStatement | null) => void;
  handleEdit: (updatedStatementData: EditTableStatementFormData) => void;
}

export default function EditStatementDialog({
  isOpen,
  setIsOpen,
  selectedTableStatement,
  setSelectedTableStatement,
  handleEdit,
}: EditStatementDialogProps) {
  const handleCancelEditStatement = () => {
    setIsOpen(false);
    setSelectedTableStatement(null);
  };

  const form = useForm<z.infer<typeof statementEditFormSchema>>({
    resolver: zodResolver(statementEditFormSchema),
    defaultValues: {
      _id: selectedTableStatement._id,
      investmentId: selectedTableStatement.investmentId,
      brokerageName: selectedTableStatement.brokerageName,
      type: selectedTableStatement.type,
      subtype: selectedTableStatement.subtype,
      startBalance: selectedTableStatement.startBalance,
      startDate: selectedTableStatement.startDate,
      endBalance: selectedTableStatement.endBalance,
      endDate: selectedTableStatement.endDate,
      depositAmount: selectedTableStatement.depositAmount,
      withdrawalAmount: selectedTableStatement.withdrawalAmount,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleCancelEditStatement}>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Statement</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-6 mb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)}>
              <div className="Signup-Grid-Container text-white">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Statement Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
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
                      <FormLabel>Start Date Balance</FormLabel>
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Statement End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
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
                      <FormLabel>End Date Balance</FormLabel>
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

              <div className="Login-Button-Container">
                <Button className="dark" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
