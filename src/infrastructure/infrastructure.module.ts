import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeormConfig } from "./config/typeorm.config";
import { UserTypeormEntity } from "./persistence/typeorm/entities/user.typeorm-entity";
import { USER_REPOSITORY } from "src/core/domain/ports/repositories/user.repository.interface";
import { UserTypeormRepository } from "./persistence/typeorm/repositories/user.typeorm-repository";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeormConfig,
    }),
    TypeOrmModule.forFeature([UserTypeormEntity]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository
    },
  ],
  exports: [USER_REPOSITORY],
})
export class InfrastructureModule {}