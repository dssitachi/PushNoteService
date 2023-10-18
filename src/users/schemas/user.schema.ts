import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    userId: string

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

}

export const UserSchema = SchemaFactory.createForClass(User);