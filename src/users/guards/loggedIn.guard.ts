import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(user){
      return true;
    }
      return false;
  }
}