import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("user_roles")
export class UserRole {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({length: 35})
  label: string;

  @AutoMap(() => User)
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
