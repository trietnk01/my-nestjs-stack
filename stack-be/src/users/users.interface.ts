import { ObjectId } from "typeorm";

export interface IUser {
  _id: ObjectId;
  userId: string;
  sub: string;
  role: string;
  username: string;
  displayName: string;
  email: string;
  age: number;
  password: string;
  phone: string;
  address: string;
  refreshToken: string;
}
