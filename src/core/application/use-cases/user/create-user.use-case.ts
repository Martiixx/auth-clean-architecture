import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user.entity';
import { IUserRepository } from 'src/core/domain/ports/repositories/user.repository.interface';
import { CreateUserDto } from '../../dtos/user/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User({
        ...createUserDto,
        isActive: true,
    });

    return await this.userRepository.create(user);
  }
}