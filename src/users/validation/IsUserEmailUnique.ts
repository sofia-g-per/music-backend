import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable } from '@nestjs/common';
import { UsersService } from "../users.service";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class IsUserEmailUnique implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(email: string) {
    try {
      await this.usersService.findByEmail(email);
    } catch (e) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `An account with this email already exists`;
  }
}