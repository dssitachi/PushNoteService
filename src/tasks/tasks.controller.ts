import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('tasksByAssignee')
  findTasksByAssignee(@Request() req) {
    const user = req.user
    console.log(user)
    const res = this.tasksService.findTasksByAssignee(user.userId)
    return res;
  }
  
  @Get(':type')
  findAll(@Param('type') type: string) {
    return this.tasksService.findAll(type);
  }

  // We can have update Task status 
  // and update Task differently only admin can update whole task whereas employee can only update status
  @Put('updateTask')
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto);
  }

  @Patch(':id')
  approveTask(@Param('id') id: string) {
    console.log(id)
    return this.tasksService.approveTask(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
