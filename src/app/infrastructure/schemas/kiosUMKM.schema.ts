import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { SurgaKuliner } from './surgaKuliner.schema';
import { KiosUMKMType } from '@app/core/models/kiosUMKM.model';

export type KiosUMKMDocument = HydratedDocument<KiosUMKMType>;

@Schema({ timestamps: true })
export class KiosUMKM implements KiosUMKMType {
    @Prop({ required: true })
    harga: number;

    @Prop({ required: true })
    kiosName: string;

    @Prop({ required: true })
    umkmType: string;

    @Prop({ required: true })
    isDisplayed: boolean;

    @Prop({ required: true })
    imageLink: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SurgaKuliner' })
    surgaKulinerId: SurgaKuliner;
}

export const KiosUMKMSchema = SchemaFactory.createForClass(KiosUMKM);
export const KiosUMKMModelMongo = mongoose.model<KiosUMKMDocument>('KiosUMKM', KiosUMKMSchema);