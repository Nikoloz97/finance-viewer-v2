import { Decimal128 } from "mongodb";

export interface Investment {
  _id?: string;
  userId: string;
  brokerageName: string;
  type: string;
  subtype: string;
  color: string;
  statements: Statement[];
}

export interface NewInvestment {
  brokerageName: string;
  type: string;
  subtype: string;
  color: string;
  startDate: Date;
  startBalance: number;
  endDate: Date;
  endBalance: number;
  depositAmount: number;
  withdrawalAmount: number;
}

export interface Statement {
  __id?: string;
  startDate: Date;
  endDate: Date;
  startBalance: Decimal128 | number;
  depositAmount: Decimal128 | number;
  endBalance: Decimal128 | number;
  withdrawalAmount: Decimal128 | number;
}

export interface TableStatement extends Statement {
  investmentId: string;
  brokerageName: string;
  type: string;
  subtype: string;
}

export interface AddStatementFormData {
  startBalance: number;
  startDate: Date;
  endBalance: number;
  endDate: Date;
  depositAmount: number;
  withdrawalAmount: number;
}

export interface EditStatementFormData {
  _id: string;
  startBalance: number;
  startDate: Date;
  endBalance: number;
  endDate: Date;
  depositAmount: number;
  withdrawalAmount: number;
}

export interface EditTableStatementFormData extends EditStatementFormData {
  investmentId: string;
  brokerageName: string;
  type: string;
  subtype: string;
}

export interface SelectedInvestment {
  investmentId: string;
  brokerageName: string;
  type: string;
  subtype: string;
}

export interface InvestmentChartData {
  month: string;
  // TODO: find out why the value (corresponds to balance) has to be type string as well
  [brokerageName: string]: number | string;
}

export interface ParsedInvestmentData {
  brokerageName: string;
  type: string;
  subtype: string;
  startDate: Date;
  startBalance: number;
  endDate: Date;
  endBalance: number;
  depositAmount: number;
  withdrawalAmount: number;
}
