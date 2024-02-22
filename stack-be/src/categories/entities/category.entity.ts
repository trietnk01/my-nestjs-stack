import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from "typeorm";

@Entity({ name: "categories" })
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  displayName: string;

  @OneToMany(() => Product, (item) => item.category)
  products: Product[];
}
