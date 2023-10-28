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
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskModel.create(createTaskDto);
    const res = await this.pushTokensService.findOne(createTaskDto.assigneeId)
    this.pushTokensService.sendPushNotification(res)
    return task;
  }

  findAll(type: string) {
    return this.taskModel.find({ status: type }).exec();
  }

  async findTasksByAssignee(assigneeId: string) {
    console.log('I am here')
    const pendingTasks = await this.taskModel.find({ assigneeId, status: "pending" }).exec();
    const completedTasks = await this.taskModel.find({ assigneeId, status: "completed" }).exec();
    const data = [
      {
        title: "TO DO",
        data: pendingTasks
      },
      {
        title: "Completed",
        data: completedTasks
      }
    ];
    return data;
  }

  async update(updateTaskDto: UpdateTaskDto) {
    const res = await this.taskModel.updateOne({ taskId: updateTaskDto.taskId }, updateTaskDto).exec();
    if (res.acknowledged) {
      return {
        message: 'Task updated successfully',
        status: true
      };
    };
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async approveTask(id: string) {
    const res = await this.taskModel.updateOne({ taskId: id }, { status: "approved" }).exec();
    if (res.acknowledged) {
      return {
        message: 'Task approved successfully',
        status: true
      };
    };
  }
}
