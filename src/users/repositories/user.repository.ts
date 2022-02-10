import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from "~users/entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async findByEmail(email: string) {
        return this.findOne({ email });
    }   
}