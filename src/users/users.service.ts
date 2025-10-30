import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    return new this.userModel(dto).save();
  }

  async getUsers() {
    return this.userModel.find().select('firstName lastName email');
  }

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
