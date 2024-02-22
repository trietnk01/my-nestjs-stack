import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import mongoose from "mongoose";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepos: Repository<Product>) {}
  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  findAll() {
    const data = this.productRepos.find({
      select: ["displayName"]
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
