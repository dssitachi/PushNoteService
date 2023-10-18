import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email}).exec();
    return user;
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = await this.userModel.create({name, email, password: hashedPassword});
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('name userId').exec();
  }
}
