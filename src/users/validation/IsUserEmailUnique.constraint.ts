import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../users.repository";
import { User } from "../entities/user.entity";
@ValidatorConstraint({ name: 'IsUserEmailUnique', async: true })
@Injectable()
export class IsUserEmailUnique implements ValidatorConstraintInterface {
  constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository,) {}

  async validate(email: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);
      console.log(user, user instanceof User)
      if(user instanceof User){
        return false;
      }else{
        return true;
      }

    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `An account with this email already exists`;
  }
}