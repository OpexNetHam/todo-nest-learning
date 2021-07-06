import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from './TaskStatus';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: TaskStatus.UNDONE, nullable: false })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
