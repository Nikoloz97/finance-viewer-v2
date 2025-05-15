import { ObjectId } from "mongodb";

export interface Investment {
  _id?: ObjectId;
  userId: string;
  brokerageName: string;
  type: string;
  subtype: string;
  color: string;
  statements: Statement[];
}

export interface Statement {
  _id: ObjectId;
  startDate: Date;
  endDate: Date;
  startBalance: number;
  depositAmount: number;
  endBalance: number;
  withdrawalAmount: number;
}
