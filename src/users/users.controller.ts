import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptors';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('getAllUsers')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('getUserById/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('getUserByEmail/:email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Patch('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return { message: 'User updated successfully' };
  }

  @Patch('activateUser/:id')
  async activateUser(@Param('id') id: string) {
    const user = await this.usersService.activate(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return { message: 'User activated successfully' };
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return { message: 'User deleted successfully' };
  }
}
