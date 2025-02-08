export type Statement = {
  depositAmount: object;
  endBalance: object;
  endDate: string;
  startBalance: object;
  startDate: string;
  statementId: string;
  withdrawalAmount: object;
};

export type Investment = {
  __id: string;
  brokerageName: string;
  color: string;
  statements: Statement;
  type: string;
  userId: string;
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
