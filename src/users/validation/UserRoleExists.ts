import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable } from '@nestjs/common';
import { UserRolesService } from "../userRoles.service";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserRoleExists implements ValidatorConstraintInterface {
  constructor(private userRolesService: UserRolesService) {}

  async validate(id: number) {
    try {
      await this.userRolesService.findById(id);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User role doesn't exist`;
  }
}