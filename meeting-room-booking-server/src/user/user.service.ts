import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { md5 } from 'src/utils/md5';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @Inject(RedisService)
  private redisService: RedisService;
  // 注册
  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha:${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码失效', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== user.captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const existUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();

    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
      return '注册失败';
    }
  }
}
