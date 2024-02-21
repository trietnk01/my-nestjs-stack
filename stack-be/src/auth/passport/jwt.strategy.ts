import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IUser } from "src/users/users.interface";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private cfService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfService.get<string>("JWT_ACCESS_TOKEN_SECRET")
    });
  }

  async validate(payload: IUser) {
    const { _id, displayName, email, role, userId } = payload;
    return { _id, displayName, email, role, userId };
  }
}
