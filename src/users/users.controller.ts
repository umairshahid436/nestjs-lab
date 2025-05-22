import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../common/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CurrentUserInterceptor } from 'src/common/interceptors/current-user.interceptor';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body);
    session.userId = user.id;
    return user;
  }

  @Post('login')
  async loginUser(@Body() body: LoginDto, @Session() session: any) {
    const user = await this.authService.login(body);
    session.userId = user.id;
    return user;
  }

  @Get('whoami')
  async whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }

  @Get('getAllUsers')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get('getUserById/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  @Get('getUserByEmail/:email')
  async findUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Patch('activateUser/:id')
  async activateUser(@Param('id') id: string) {
    return this.usersService.activate(id);
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
