import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { LowerTransformer } from '~core/transformers/lower.transformer';
import { TimestampTransformer } from '~core/transformers/timestamp.transformer';
// import { UserRoleEnum } from '../enums/user-role.enum';
// import { UserStatusEnum } from '../enums/user-status.enum';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ transformer: new LowerTransformer() })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  // @Column()
  // role: UserRoleEnum;

  @Column({ default: 'en', transformer: new LowerTransformer(), length: 10 })
  language?: string;

  // @Column()
  // status: UserStatusEnum;

  @Column({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  lastLoginAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    transformer: new TimestampTransformer(),
  })
  deletedAt?: Date;
}
