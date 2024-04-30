import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTaskFilterDto } from 'src/dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from 'src/dto/update-task-status.dto';
import { Task } from '../models/task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
    this.tasksService = tasksService;
  }
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log('Received createTaskDto:', createTaskDto);

    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('field') field: keyof Task,
    @Body('value') value: any,
  ): Task {
    return this.tasksService.updateTaskField(id, field, value);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
