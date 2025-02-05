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
