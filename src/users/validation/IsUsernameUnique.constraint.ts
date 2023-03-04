import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../users.repository";
import { User } from "../entities/user.entity";
@ValidatorConstraint({ name: 'IsUserEmailUnique', async: true })
@Injectable()
export class IsUsernameUnique implements ValidatorConstraintInterface {
  constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository,) {}

  async validate(username: string) {
    try {
      const user = await this.usersRepository.findByUsername(username);
      if(user instanceof User){
        return false;
      }else{
        return true;
      }

    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Аккаунт с таким именем пользователя уже существует`;
  }
}
