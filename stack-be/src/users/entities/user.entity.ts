import mongoose from "mongoose";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @ObjectIdColumn()
  _id: mongoose.Types.ObjectId;

  @Column()
  userId: string;

  @Column()
  sub: string;

  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  refreshToken: string;
}
