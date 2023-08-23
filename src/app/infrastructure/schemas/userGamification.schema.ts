import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { UserGamificationType } from '@app/core/models/userGamification.model';
import { User } from './user.schema';

export type UserGamificationDocument = HydratedDocument<UserGamificationType>;

@Schema({ timestamps: true })
export class UserGamification implements UserGamificationType {
    @Prop({ required: true })
    currentXp: number;

    @Prop({ required: true })
    currentRank: number;

    @Prop({ required: true })
    maxExpRank: number;

    @Prop({ required: true })
    rankName: string;

    @Prop({ required: true })
    totalCoints: number;

    @Prop({ required: true })
    assignedUmkmCount: number;

    @Prop({ required: true })
    availabilityStatus: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const UserGamificationSchema = SchemaFactory.createForClass(UserGamification);
export const UserGamificationModelMongo = mongoose.model<UserGamificationDocument>('UserGamification', UserGamificationSchema);