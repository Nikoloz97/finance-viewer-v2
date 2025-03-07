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
  startBalance: Decimal128;
  depositAmount: Decimal128;
  endBalance: Decimal128;
  withdrawalAmount: Decimal128;
}

export interface NewStatement {
  startBalance: number;
  startDate: Date;
  endBalance: number;
  endDate: Date;
  depositAmount: number;
  withdrawalAmount: number;
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

export type ParsedInvestmentData = {
  brokerageName: string;
  type: string;
  subtype: string;
  startDate: Date;
  startBalance: number;
  endDate: Date;
  endBalance: number;
  depositAmount: number;
  withdrawalAmount: number;
};
