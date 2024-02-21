import { Controller, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { Request } from "express";
import { UsersService } from "./users.service";
import { Public } from "src/decorator/customize";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/get-by-username")
  findOneByUsername(@Query() query: any) {
    const { username } = query;
    return this.usersService.findOneByUsername(username);
  }

  @Get("/get-by-id/:id")
  findOneById(@Param() params: any) {
    const { id } = params;
    return this.usersService.findOne(id);
  }

  @Public()
  @Patch("/refresh-token/:id")
  handleRefresh(@Param() params: any, @Req() req: Request) {
    const { id } = params;
    const { token } = req.body;
    return this.usersService.updateUserToken(id, token);
  }
}
