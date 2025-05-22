import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

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

  @Get('getUserById/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('getUserByEmail/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Put('updateUser/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Put('activateUser/:id')
  activateUser(@Param('id') id: string) {
    return this.usersService.activate(id);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
