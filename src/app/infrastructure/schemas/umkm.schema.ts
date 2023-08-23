import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { UMKMType } from '@app/core/models/umkm.model';

export type UMKMDocument = HydratedDocument<UMKMType>;

@Schema({ timestamps: true })
export class UMKM implements UMKMType {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    lat: number;

    @Prop({ required: true })
    long: number;

    @Prop({ required: true })
    statusHalal: boolean;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    noTelp: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const UMKMSchema = SchemaFactory.createForClass(UMKM);
export const UMKMModelMongo = mongoose.model<UMKMDocument>('UMKM', UMKMSchema);