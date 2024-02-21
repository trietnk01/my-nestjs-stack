import { Controller, Get, Param, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/get-by-username")
  findOneByUsername(@Query() query) {
    const { username } = query;
    return this.usersService.findOneByUsername(username);
  }

  @Get("/get-by-id/:id")
  findOneById(@Param("id") id: string) {
    return { id };
  }
}
