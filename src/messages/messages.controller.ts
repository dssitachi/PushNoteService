import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    // return this.messagesService.findAll();
  }

  @Get('sorted/:sender/:receiver')
  async getSortedMessages(
    @Param('sender') sender: string,
    @Param('receiver') receiver: string,
  ): Promise<CreateMessageDto[]> {
    return this.messagesService.getSortedMessages(sender, receiver);
  }
  
  
}
