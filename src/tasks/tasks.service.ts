import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from '../models/task.model';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    this.logger.log('Getting all tasks');

    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, images } = createTaskDto;
   // Additional logging to verify the structure right before the operation that fails
   if (!createTaskDto.images) {
    this.logger.error('Images array is undefined');
  } else {
    this.logger.debug('Images array:', JSON.stringify(createTaskDto.images));
  }
    const mappedImages = images.map(image => ({
      id: uuid(), 
      url: image.url  
    }));
    const task: Task = {
      id: uuid(), 
      title,
      description,
      status: TaskStatus.OPEN,
      images:mappedImages ,
      };
      
     
      
    
    this.tasks.push(task);
    return task;
  }
}
