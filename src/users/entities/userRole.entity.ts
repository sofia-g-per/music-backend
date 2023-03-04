import { AutoMap } from '@automapper/classes';
import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("user_roles")
@Check(`"id" > 0 AND "id" < 100`)
export class UserRole {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({length: 35})
  name: string;

  @AutoMap(() => User)
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
