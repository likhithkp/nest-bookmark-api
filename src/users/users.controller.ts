import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  Delete,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    if (!newUser) throw new HttpException('Failed to create user', 500);

    return {
      success: true,
      message: 'User created successfully',
      data: newUser,
    };
  }

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    if (!users) throw new HttpException('Failed to get users', 500);

    return {
      success: true,
      count: users.length,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ObjectId', 400);
    }

    const user = await this.usersService.getUser(id);
    if (!user) throw new HttpException('Failed to get user', 500);

    return {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ObjectId', 400);
    }

    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('Failed to update user', 500);

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ObjectId', 400);
    }

    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
