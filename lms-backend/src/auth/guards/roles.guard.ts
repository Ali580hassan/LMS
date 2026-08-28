import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 1. If no roles are required on the route/controller, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // 2. Prevent crash if JwtAuthGuard didn't attach the user object
    if (!user || !user.role) {
      throw new ForbiddenException(
        'Access denied: User or role context missing',
      );
    }

    // 3. Case-insensitive role comparison
    const userRole = user.role.toLowerCase();
    return requiredRoles.some((role) => role.toLowerCase() === userRole);
  }
}
