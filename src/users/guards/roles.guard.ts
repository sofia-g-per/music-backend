import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    console.log(request.user)
    if(!request.user){
      return false;
    }
    const user = request.user;
    console.log(roles === user.role.name)

    return roles.includes(user.role.name);
  }
}