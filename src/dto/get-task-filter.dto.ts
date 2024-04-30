import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/models/task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
