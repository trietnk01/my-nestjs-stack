import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { IUser } from "src/users/users.interface";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private confService: ConfigService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }
  async login(user: IUser, response: Response) {
    const { _id, displayName, email, role } = user;
    const payload = { sub: "token login", iss: "from server", _id, name, email, role };
    const refresh_token = this.createRefreshToken(payload);
    await this.usersService.updateUserToken(_id, refresh_token);
    response.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: parseInt(this.confService.get<string>("JWT_REFRESH_EXPIRE").toString())
    });
    return {
      access_token: this.jwt.sign(payload),
      refresh_token,
      user: {
        _id,
        name,
        email,
        role
      }
    };
  }
  createRefreshToken = (payload: any) => {
    const refreshToken = this.jwt.sign(payload, {
      secret: this.confService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: `${this.confService.get<string>("JWT_REFRESH_EXPIRE")}s`
    });
    return refreshToken;
  };
  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwt.verify(refreshToken, { secret: this.confService.get<string>("JWT_REFRESH_TOKEN_SECRET") });
      let user: IUser = await this.usersService.findUserByToken(refreshToken);
      if (user) {
        const { _id, displayName, email, role } = user;
        const payload = { sub: "token login", iss: "from server", _id, displayName, email, role };
        const refresh_token = this.createRefreshToken(payload);
        await this.usersService.updateUserToken(_id, refresh_token);
        response.clearCookie("refresh_token");
        response.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: parseInt(this.confService.get<string>("JWT_REFRESH_EXPIRE").toString())
        });
        return {
          access_token: this.jwt.sign(payload),
          refresh_token,
          user: {
            _id,
            name,
            email,
            role
          }
        };
      }
    } catch (err) {
      throw new BadRequestException("Request token không hợp lệ");
    }
  };
  logout = async (response: Response, user: IUser) => {
    await this.usersService.updateUserToken(user._id, "");
    response.clearCookie("refresh_token");
    return "ok";
  };
}
