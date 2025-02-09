import { Decimal128 } from "mongodb";

export type Statement = {
  statementId: string;
  // TODO: fix these or types (see createInvestment function)
  startDate: string | Date;
  endDate: string | Date;
  startBalance: string | Decimal128;
  depositAmount: string | Decimal128;
  endBalance: string | Decimal128;
  withdrawalAmount: object | Decimal128;
};

export type Investment = {
  // TODO: the optional __id is when creating a new investment
  __id?: string;
  brokerageName: string;
  color: string;
  statements: Statement[];
  type: string;
  userId: string;
};

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
