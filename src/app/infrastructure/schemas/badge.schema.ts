import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BadgeType } from '@app/core/models/badge.model';
import { User } from './user.schema';

export type BadgeDocument = HydratedDocument<BadgeType>;

@Schema({ timestamps: true })
export class Badge implements BadgeType {
    @Prop({ required: true })
    badgeType: string;

    @Prop({ required: true })
    badgeTier: number;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    earnedDate: Date;

    @Prop({ required: true })
    visualReference: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
export const BadgeModelMongo = mongoose.model<BadgeDocument>('Badge', BadgeSchema);