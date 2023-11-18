import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

// 声明为全局模块，这样只需要在AppModules中引入即可，其他模块无需引入也可注入
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('REDIS_SERVER_HOST'),
            port: configService.get('REDIS_SERVER_PORT'),
          },
          database: configService.get('REDIS_SERVER_DB'), // redis 的 database 就是一个命名空间的概念
        });

        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
