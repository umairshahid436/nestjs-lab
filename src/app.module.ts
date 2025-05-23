import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ReportsModule } from './modules/reports/reports.module';
import { User } from './modules/users/user.entity';
import { Report } from './modules/reports/report.entity';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
      }),
    }),

    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },

    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['random_key_temp'],
        }),
      )
      .forRoutes('*');
  }
}
