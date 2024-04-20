import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from '../models/task.model';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, images} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      images:images,
    };
    this.tasks.push(task);
    return task;
  }
}
