import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from 'src/common/interceptors/current-user.interceptor';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
