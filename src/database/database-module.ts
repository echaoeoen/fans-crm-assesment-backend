import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

export default class DatabaseModule {
  static forRoot(): DynamicModule {
    const imports = [
      SequelizeModule.forRootAsync({
        useFactory: async (configService: ConfigService) => {
          return {
            dialect: 'mysql',
            host: configService.get('MYSQL_HOST'),
            port: configService.get('MYSQL_PORT'),
            username: configService.get('MYSQL_USER'),
            password: configService.get('MYSQL_PASSWORD'),
            database: configService.get('MYSQL_DATABASE'),
            autoLoadModels: true,
            synchronize: true,
            sync: { alter: true },
          };
        },
        inject: [ConfigService],
      }),
    ];
    return {
      imports,
      global: true,
      providers: [],
      exports: [],
      module: DatabaseModule,
    };
  }
}
