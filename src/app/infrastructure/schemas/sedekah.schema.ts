import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { SedekahType } from '@app/core/models/sedekah.model';

export type SedekahDocument = HydratedDocument<SedekahType>;

@Schema({ timestamps: true })
export class Sedekah implements SedekahType {
    @Prop({ required: true })
    taskDetail: string;

    @Prop({ required: true })
    originalRewardPoint: number;

    @Prop({ required: true })
    originalRewardExp: number;

    @Prop({ required: true })
    receivedPoint: number;

    @Prop({ required: true })
    receivedExp: number;

    @Prop({ required: true })
    donorGamblingMultiplierPoint: number;

    @Prop({ required: true })
    donorGamblingMultiplierExp: number;

    @Prop({ required: true })
    donorReceivedPoint: number;

    @Prop({ required: true })
    donorReceivedExp: number;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const SedekahSchema = SchemaFactory.createForClass(Sedekah);
export const SedekahModelMongo = mongoose.model<SedekahDocument>('Sedekah', SedekahSchema);