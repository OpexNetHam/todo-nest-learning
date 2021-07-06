import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from './task.dto'; // Todo: find solution to rewrite required value title to optional when extending  TaskDto to UpdateTaskDto
import { TaskStatus } from './TaskStatus';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ type: String, description: 'Task title', required: false })
  title?: string;
  @ApiProperty({
    type: String,
    description: 'Task description',
    required: false,
  })
  description?: string;
  @ApiProperty({
    type: Number,
    description: 'Task status. 0 for undone, 1 for done',
    required: false,
  })
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
