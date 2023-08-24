import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserModelType } from '@app/core/models/user.model';

export type UserDocument = HydratedDocument<UserModelType>;

@Schema({ timestamps: true })
export class User implements UserModelType {
    _id: string;    

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    profilePictureLink: string;

    @Prop({ required: true })
    region_kecamatan: string;

    @Prop({ required: true })
    region_city: string;

    @Prop({ required: false })
    loginAt: Date;

    @Prop({ required: false })
    tokensEmail: string;

    @Prop({ required: false })
    tokensLogin: string;

    @Prop({ required: false })
    tokenForgotPassword: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModelMongo = mongoose.model<UserDocument>('User', UserSchema);