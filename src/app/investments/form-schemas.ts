import { z } from "zod";

export const investmentAddFormSchema = z
  .object({
    brokerageName: z.string().min(1, {
      message: "Please select a brokerage",
    }),
    type: z.string().min(1, {
      message: "Please select an investment type",
    }),
    subtype: z.string().min(1, {
      message: "Please select an investment subtype",
    }),
    color: z.string().min(1, {
      message: "Please select a color to represent your investment",
    }),
    startDate: z
      .date({
        message: "Please select a start date",
      })
      .refine(
        (date) => {
          const day = date.getDate();
          return day >= 25 || day <= 5;
        },
        {
          message:
            "Day must be equal or less than the 5th or equal or greater than the 25th",
        }
      ),
    startBalance: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    endDate: z
      .date({
        message: "Please select an end date",
      })
      .refine(
        (date) => {
          const day = date.getDate();
          return day >= 25 || day <= 5;
        },
        {
          message:
            "Day must be equal or less than the 5th or equal or greater than the 25th",
        }
      ),
    endBalance: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    depositAmount: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    withdrawalAmount: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after the start date",
    path: ["endDate"],
  });

export const statementAddFormSchema = z
  .object({
    startDate: z
      .date({
        message: "Please select a start date",
      })
      .refine(
        (date) => {
          const day = date.getDate();
          return day >= 25 || day <= 5;
        },
        {
          message:
            "Day must be equal or less than the 5th or equal or greater than the 25th",
        }
      ),
    // TODO: try out coercion here? Or nan?
    startBalance: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    endDate: z
      .date({
        message: "Please select an end date",
      })
      .refine(
        (date) => {
          const day = date.getDate();
          return day >= 25 || day <= 5;
        },
        {
          message:
            "Day must be equal or less than the 5th or equal or greater than the 25th",
        }
      ),
    endBalance: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    depositAmount: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
    withdrawalAmount: z.preprocess(
      (input) => (typeof input === "number" ? input.toString() : input),
      z
        .string()
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value), {
          message: "Please enter a valid number",
        })
    ),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after the start date",
    path: ["endDate"],
  });
