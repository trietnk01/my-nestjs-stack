import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { IUser } from "src/users/users.interface";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.auth.login(req.user, response);
  }

  @ResponseMessage("Get user information")
  @Get("/account")
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

  @ResponseMessage("Logout user")
  @Post("/logout")
  handleLogout(@Res({ passthrough: true }) response: Response, @User() user: IUser) {
    return this.auth.logout(response, user);
  }
}
