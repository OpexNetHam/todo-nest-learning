import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../TaskStatus';

export class TaskDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Task title' })
  title: string;
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
  status?: TaskStatus;
}
