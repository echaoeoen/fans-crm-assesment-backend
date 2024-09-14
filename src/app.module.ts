import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './database/database-module';
import UserModule from './user/user-module';
import AuthMiddleware from './user/application/middleware/auth-middleware';
import UserService from './user/domain/user-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    UserModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('/v1/login').forRoutes('*');
  }
}
