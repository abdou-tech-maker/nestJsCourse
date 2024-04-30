import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { v4 as uuid } from 'uuid';

import { GetTaskFilterDto } from 'src/dto/get-task-filter.dto';
import { Task, TaskStatus } from '../models/task.model';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    this.logger.log('Getting all tasks');

    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status.includes(status));
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, images } = createTaskDto;

    const mappedImages = images.map((image) => ({
      id: uuid(),
      url: image.url,
    }));
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      images: mappedImages,
    };

    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      return found;
    }
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  updateTaskField(id: string, field: keyof Task, value: any): Task {
    const task = this.getTaskById(id);
    task[field] = value;
    return task;
  }
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
