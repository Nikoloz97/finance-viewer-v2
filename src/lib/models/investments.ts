import { Decimal128 } from "mongodb";

// TODO: figure out which of these versions to use

// export interface Investment {
//   _id: string;
//   userId: string;
//   brokerageName: string;
//   type: string;
//   subtype: string;
//   color: string;
//   statements: Statement[];
// }

export interface Investment {
  // TODO: the optional __id is when creating a new investment
  __id?: string;
  userId: string;
  brokerageName: string;
  type: string;
  subtype: string;
  color: string;
  statements: Statement[];
}

// TODO: figure out which of these versions to use

// export interface Statement {
//   statementId: string;
//   startBalance: number;
//   startDate: Date;
//   endBalance: number;
//   endDate: Date;
//   depositAmount: number;
//   withdrawalAmount: number;
// }

export interface Statement {
  statementId: string;
  // TODO: fix these or types (see createInvestment function)
  startDate: string | Date;
  endDate: string | Date;
  startBalance: string | Decimal128;
  depositAmount: string | Decimal128;
  endBalance: string | Decimal128;
  withdrawalAmount: object | Decimal128;
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

// TODO: get rid of this?? (or maybe somehow utilize this in createInvestment to fix the or typing in Statement)
export type NewInvestment = {
  brokerageName: string;
  type: string;
  subtype: string;
  startBalance: number;
  startDate: Date;
  endBalance: number;
  endDate: Date;
  depositAmount: number;
  withdrawalAmount: number;
};

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
