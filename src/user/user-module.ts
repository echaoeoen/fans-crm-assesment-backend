import { DynamicModule } from '@nestjs/common';
import UserRepository from './infrastructure/repository/user-repository';
import UserService from './domain/user-service';
import { SequelizeModule } from '@nestjs/sequelize';
import UserModel from './infrastructure/repository/user-model';
import UserController from './application/controller/user-controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export default class UserModule {
  static forRoot(): DynamicModule {
    return {
      module: UserModule,
      imports: [
        SequelizeModule.forFeature([UserModel]),
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => {
            const secret = configService.get('JWT_SECRET') || 'default-secret';
            return {
              secret: secret,
              signOptions: { expiresIn: '1d' },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [UserRepository, UserService],
      exports: [UserRepository, UserService],
      controllers: [UserController],
      global: true,
    };
  }
}
