import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

  @Prop({
    type: String, default: function genUUID() {
      return uuidv4()
    }
  })
  taskId: string

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
  assigneeId: string;

  @Prop()
  assignedBy: string;

  @Prop()
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);