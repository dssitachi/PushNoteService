import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PushTokenDocument = HydratedDocument<PushToken>;

@Schema()
export class PushToken {
    @Prop()
    token: string;

    @Prop()
    userId: string;
}

export const PushTokenSchema = SchemaFactory.createForClass(PushToken);