import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/core/domain/ports/repositories/user.repository.interface";
import { UserTypeormEntity } from "../entities/user.typeorm-entity";
import { Repository } from "typeorm";
import { User } from "src/core/domain/entities/user.entity";
import { UserNotFoundException } from "src/core/domain/exceptions/user.exception";

@Injectable()
export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map(user => this.toEntity(user));
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null
    }
    return this.toEntity(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null
    }
    return this.toEntity(user);
  }

  async create(user: User): Promise<User> {
    const userEntity = this.toTypeormEntity(user);
    const savedUser = await this.userRepository.save(userEntity);
    return savedUser;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const result = this.userRepository.update(id, user);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new UserNotFoundException(id);
  }

  private toEntity(typeormEntity: UserTypeormEntity) {
    return new User({
      id: typeormEntity.id,
      email: typeormEntity.email,
      name: typeormEntity.name,
      password: typeormEntity.password,
      isActive: typeormEntity.isActive,
      createdAt: typeormEntity.createdAt,
      updatedAt: typeormEntity.updatedAt
    });
  }

  private toTypeormEntity(entity: User) {
    const typeormEntity = new UserTypeormEntity();
    Object.assign(typeormEntity, {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      name: entity.name,
      isActive: entity.isActive
    });
    return typeormEntity;
  }
}