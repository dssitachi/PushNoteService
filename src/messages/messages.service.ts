import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {

  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {}
  async create(createMessageDto: CreateMessageDto) {
    await this.messageModel.create(createMessageDto);
    return 'This action adds a new message';
  }

  async getSortedMessages(sender: string, receiver: string): Promise<any[]> {
    return this.messageModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .sort({ timestamp: 1 }) // Use 1 for ascending or -1 for descending
      .exec();
  }
}
