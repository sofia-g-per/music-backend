import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../users.repository";
import { User } from "../entities/user.entity";
@ValidatorConstraint({ name: 'IsUsernameUnique', async: true })
@Injectable()
export class IsUsernameUnique implements ValidatorConstraintInterface {
  constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {}

  async validate(username: string) {
    try {
      const user = await this.usersRepository.findByUsername(username);
      console.log(user);
      if(user instanceof User){
        return false;
      }else{
        return true;
      }

    } catch (e) {
      // fix
      console.log(e);
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Аккаунт с таким именем пользователя уже существует`;
  }
}
