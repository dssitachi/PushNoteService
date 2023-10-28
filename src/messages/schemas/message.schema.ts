import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop({
        type: String, default: function genUUID() {
            return uuidv4()
        }
    })
    messageId: string

    @Prop()
    message: string;

    @Prop()
    sender: string;

    @Prop()
    receiver: string;

    @Prop()
    timestamp: Date;

    @Prop()
    taskId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);