import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { SurgaKuliner } from './surgaKuliner.schema';
import { OrnamentType } from '@app/core/models/ornament.model';

export type OrnamentDocument = HydratedDocument<OrnamentType>;

@Schema({ timestamps: true })
export class Ornament implements OrnamentType {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    coinCost: number;

    @Prop({ required: true })
    imageLink: string;

    @Prop({ required: true })
    rarity: string;

    @Prop({ required: true })
    purchaseLimit: number;

    @Prop({ required: true })
    isAnmiated: boolean;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SurgaKuliner' })
    surgaKulinerId: SurgaKuliner;
}

export const OrnamentSchema = SchemaFactory.createForClass(Ornament);
export const OrnamentModelMongo = mongoose.model<OrnamentDocument>('Ornament', OrnamentSchema);