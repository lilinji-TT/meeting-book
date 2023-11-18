import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';

interface JwtUserData {
  userId: number;
  username: string;
  roles: Role[];
  permissions: Permission[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject()
  private reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // 用 reflector 从目标 controller 和 handler 上拿到 require-login 的 metadata。
    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    // 如果没有 metadata，就是不需要登录，返回 true 放行。
    if (!requireLogin) {
      return true;
    }

    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify<JwtUserData>(token);

      request.user = {
        userId: data.userId,
        username: data.username,
        roles: data.roles,
        permission: data.permissions,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token 已失效，请重新登录');
    }
  }
}
