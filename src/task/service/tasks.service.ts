import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from '../models/task.dto';
import { UpdateTaskDto } from '../models/update-task.dto';

import { Task, TaskDocument } from '../models/task.schema';

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

  async create(TaskDto: TaskDto): Promise<Task> {
    const { title } = TaskDto;
    const createdTask = await this.model.findOne({ title }).exec();
    if (createdTask) {
      throw new BadRequestException({
        message: 'You already created this task',
      });
    }
    return await new this.model({
      ...TaskDto,
      createdAt: new Date(),
    }).save();
  }

  async update(title: string, UpdateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.model
      .findOneAndUpdate({ title }, UpdateTaskDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();
  }

  async delete(title: string): Promise<Task> {
    return await this.model.findOneAndDelete({ title }).exec();
  }
}
