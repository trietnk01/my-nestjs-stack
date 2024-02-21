import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/entities/category.entity";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production"]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        type: "mongodb",
        host: confService.get<string>("MONGODB_HOST"),
        port: parseInt(confService.get<string>("MONGODB_PORT").toString()),
        username: confService.get<string>("MONGODB_USERNAME").toString(),
        password: confService.get<string>("MONGODB_PASSWORD").toString(),
        database: confService.get<string>("MONGODB_DATABASE").toString(),
        entities: [Category, User]
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
