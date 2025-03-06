import { Decimal128 } from "mongodb";

// TODO: see below todo

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
  _id: string;
  userId: string;
  brokerageName: string;
  type: string;
  subtype: string;
  color: string;
  statements: Statement[];
}

// TODO: figure out why we don't have a userId
// TODO: get rid of this?? (see above todo)
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
  __id?: string;
  // TODO: clean up these or types?? (see createInvestment function)
  startDate: string | Date;
  endDate: string | Date;
  startBalance: string | Decimal128;
  depositAmount: string | Decimal128;
  endBalance: string | Decimal128;
  withdrawalAmount: object | Decimal128;
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
