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
    const res = await this.pushTokensService.findOne(createTaskDto.assigneeId)
    this.pushTokensService.sendPushNotification(res)
    return task;
  }

  findAll() {
    return this.taskModel.find().exec();
  }

  async findTasksByAssignee(assigneeId: string) {
    console.log(assigneeId);
    const res = await this.taskModel.find({assigneeId}).exec();
    console.log(res);
    return res;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
