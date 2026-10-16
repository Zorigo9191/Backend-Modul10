import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CourseModule } from './course/course.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigInterface } from './common/provider/config/config.type.js';
import { AuthModule } from './common/auth/auth.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    AuthModule,
    CourseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<ConfigInterface>) => ({
        uri: configService.get<string>('MONGOOSE_CONNECTION'),
      }),
      inject: [ConfigService],
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
