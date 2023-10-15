import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  priority: string;

  @Prop()
  dueTime: string;

  @Prop()
  dueDate: string;

  @Prop()
  assignee: string;

  @Prop()
  assignedBy: string;

  @Prop()
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);