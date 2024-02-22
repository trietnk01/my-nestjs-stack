import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, ObjectId, ObjectIdColumn } from "typeorm";
@Entity({ name: "products" })
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  displayName: string;

  @ManyToOne(() => Category, (item) => item.products)
  /* @JoinColumn({ name: "categoryId" }) */
  category: Category;
}
