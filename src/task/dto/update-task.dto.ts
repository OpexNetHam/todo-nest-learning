import { TaskDto } from './task.dto';
import { TaskStatus } from '../TaskStatus';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends TaskDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
