import { Injectable } from "@nestjs/common";
import { UserEntity } from "~users/entities/user.entity";
import { UserRepository } from "~users/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}

    findByIdNotFail(id: string) {
        return this.userRepo.findOne(id);
    }

    findByEmailNotFail(email: string) {
        return this.userRepo.findOne(email);
    }

    save(user) {
        return this.userRepo.save(user);
    }
}