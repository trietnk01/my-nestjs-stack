import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { ObjectId, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { IUser } from "./users.interface";
import mongoose from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  findOne = async (id: ObjectId) => {
    return this.usersRepository.findOne({ where: { _id: new mongoose.Types.ObjectId(id) } });
  };
  findOneByUsername = async (username: string) => {
    const data = await this.usersRepository.findOne({ select: ["_id", "displayName", "email", "password"], where: { username } });
    return data;
  };
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  updateUserToken = async (id: ObjectId, refreshToken: string) => {
    return this.usersRepository.update({ _id: new mongoose.Types.ObjectId(id) }, { refreshToken });
  };
  findUserByToken = async (refreshToken: string) => {
    let data: IUser = await this.usersRepository.findOne({ where: { refreshToken } });
    return data;
  };
}
