import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "./application/use-cases/user/create-user.use-case";


@Module({
  providers: [
    CreateUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
  ],
})
export class CoreModule {}