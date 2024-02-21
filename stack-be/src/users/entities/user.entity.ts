import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  displayName: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  address: string;
}
