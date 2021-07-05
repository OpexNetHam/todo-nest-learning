import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskService } from '../service/tasks.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  @ApiOkResponse()
  async index() {
    return await this.service.findAll();
  }

  @Get(':title')
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiOkResponse({ description: 'Task found' })
  async find(@Param('title') title: string) {
    return await this.service.findOne(title);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Task created. Returns created task object',
  })
  @ApiBadRequestResponse({ description: 'Failed to create task' })
  @ApiBody({ type: CreateTaskDto })
  @UsePipes(ValidationPipe)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.service.create(createTaskDto);
  }

  @Put(':title')
  @ApiOkResponse({ description: 'Task updated' })
  @ApiBadRequestResponse({ description: 'Failed to update task' })
  @ApiBody({ type: UpdateTaskDto })
  @UsePipes(ValidationPipe)
  async update(
    @Param('title') title: string,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ) {
    return await this.service.update(title, UpdateTaskDto);
  }

  @Delete(':title')
  @ApiOkResponse({ description: 'Task deleted. Returns deleted task object' })
  @ApiBadRequestResponse({ description: 'Failed to delete a task' })
  async delete(@Param('title') title: string) {
    return await this.service.delete(title);
  }
}
