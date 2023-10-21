import { Injectable } from '@nestjs/common';
import { CreatePushTokenDto } from './dto/create-push-token.dto';
import { UpdatePushTokenDto } from './dto/update-push-token.dto';
import { PushToken } from './schemas/push-token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import Expo from 'expo-server-sdk';

let expo = new Expo();

@Injectable()
export class PushTokensService {
  constructor(@InjectModel(PushToken.name) private readonly pushTokenModel: Model<PushToken>) {}
  
  async create(createPushTokenDto: CreatePushTokenDto) {
    const isTokenExists = await this.pushTokenModel.findOne({ userId: createPushTokenDto.userId }).exec();
    if(isTokenExists) {
      const res = await this.pushTokenModel.updateOne({ userId: createPushTokenDto.userId }, { token: createPushTokenDto.token }).exec();
      return res;
    }
    const token = await this.pushTokenModel.create(createPushTokenDto);
    return token;
  }

  sendPushNotification(to: string) {
    expo.sendPushNotificationsAsync([
      { to, sound: 'default', body: 'This is a test notification' },
    ])
    return `This action returns all pushTokens`;
  }

  async findOne(userId: string) {
    
    const token = await this.pushTokenModel.findOne({ userId }).exec();
    return token.token;
  }

  update(id: number, updatePushTokenDto: UpdatePushTokenDto) {
    return `This action updates a #${id} pushToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} pushToken`;
  }
}
