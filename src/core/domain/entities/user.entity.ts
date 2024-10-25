import { BaseEntity } from "./base.entity";

export class User extends BaseEntity {
    email: string;
    password: string;
    name: string;
    isActive: boolean;

    constructor(partial: Partial<User>) {
        super(partial);
        Object.assign(this, partial);
    }
}