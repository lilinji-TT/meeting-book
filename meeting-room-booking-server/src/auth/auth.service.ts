// auth.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserInfo } from 'src/user/vo/login-user.vo';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAuthToken(user: UserInfo) {
    const payload = {
      userId: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn:
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME') || '30m',
    });

    const refresh_token = this.jwtService.sign(
      {
        userId: payload.userId,
      },
      {
        expiresIn:
          this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME') || '7d',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }
}
