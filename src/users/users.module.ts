import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ]
})
export class UsersModule {}