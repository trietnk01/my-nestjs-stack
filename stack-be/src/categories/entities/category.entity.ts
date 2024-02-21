import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "categories" })
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  displayName: string;
}
