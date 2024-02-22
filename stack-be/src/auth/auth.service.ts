import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import ms from "ms";
import { IUser } from "src/users/users.interface";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private confService: ConfigService
  ) {}

  validateUser = async (username: string, password: string): Promise<any> => {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(password, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  };
  async login(user: IUser, response: Response) {
    try {
      const { _id, displayName, email } = user;
      const payload = { sub: "token login", iss: "from server", _id, name: displayName, email };
      const token = this.createToken(payload);
      await this.usersService.updateUserToken(_id, token);
      response.cookie("refresh_token", token, {
        httpOnly: true,
        maxAge: ms(this.confService.get<string>("JWT_ACCESS_EXPIRE")) / 1000
      });
      return {
        access_token: token,
        user: {
          _id,
          displayName,
          email
        }
      };
    } catch (err) {
      throw new BadRequestException("ERROR_SYSTEM");
    }
  }
  createToken = (payload: any) => {
    const refreshToken = this.jwt.sign(payload, {
      secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRE").toString()
    });
    return refreshToken;
  };
  logout = async (response: Response, user: IUser) => {
    await this.usersService.updateUserToken(user._id, "");
    response.clearCookie("refresh_token");
    return { access_token: "" };
  };
}
