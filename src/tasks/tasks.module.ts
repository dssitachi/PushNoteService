import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PushTokensModule } from 'src/push-tokens/push-tokens.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    PushTokensModule
  ]
})
export class TasksModule {}
