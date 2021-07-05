import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly model: Model<TaskDocument>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.model.find().exec();
  }

  async findOne(title: string): Promise<Task> {
    return await this.model.findOne({ title }).exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;
    const createdTask = await this.model.findOne({ title }).exec();
    if (createdTask) {
      throw new BadRequestException({
        message: 'You already created this task',
      });
    }
    return await new this.model({
      ...createTaskDto,
      createdAt: new Date(),
    }).save();
  }

  async update(title: string, updateTodoDto: UpdateTaskDto): Promise<Task> {
    return await this.model
      .findOneAndUpdate({ title }, updateTodoDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();
  }

  async delete(title: string): Promise<Task> {
    return await this.model.findOneAndDelete({ title }).exec();
  }
}
