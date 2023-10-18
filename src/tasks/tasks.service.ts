import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PushTokensService } from 'src/push-tokens/push-tokens.service';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly pushTokensService: PushTokensService
  ) {}
  
  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskModel.create(createTaskDto);
    const res = await this.pushTokensService.findOne(createTaskDto.assignee)
    this.pushTokensService.sendPushNotification(res)
    return task;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
