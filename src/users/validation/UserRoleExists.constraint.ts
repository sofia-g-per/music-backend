import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { Injectable } from '@nestjs/common';
import { UserRolesRepository } from "../userRoles.repository";
import { InjectRepository } from "@nestjs/typeorm";

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserRoleExists implements ValidatorConstraintInterface {
  constructor( @InjectRepository(UserRolesRepository) private userRolesRepository: UserRolesRepository,
    ) {}

  async validate(id: number) {
    try {
      await this.userRolesRepository.findById(id);

    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User role doesn't exist`;
  }
}