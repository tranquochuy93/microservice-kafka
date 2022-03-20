import { Injectable } from '@nestjs/common';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  findByIdNotFail(id: string) {
    return this.userRepo.findOne(id);
  }

  findByEmailNotFail(email: string) {
    return this.userRepo.findOne({ email });
  }

  save(user) {
    return this.userRepo.save(user);
  }
}
