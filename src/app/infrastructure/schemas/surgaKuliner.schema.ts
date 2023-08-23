import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { SurgaKulinerType } from '@app/core/models/surgaKuliner.model';

export type SurgaKulinerDocument = HydratedDocument<SurgaKulinerType>;

@Schema({ timestamps: true })
export class SurgaKuliner implements SurgaKulinerType {
    @Prop({ required: true })
    sentraName: string;

    @Prop({ required: true })
    currentCapacity: number;

    @Prop({ required: true })
    maxCapacity: number;

    @Prop({ required: true })
    expansionCost: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const SurgaKulinerSchema = SchemaFactory.createForClass(SurgaKuliner);
export const SurgaKulinerModelMongo = mongoose.model<SurgaKulinerDocument>('SurgaKuliner', SurgaKulinerSchema);