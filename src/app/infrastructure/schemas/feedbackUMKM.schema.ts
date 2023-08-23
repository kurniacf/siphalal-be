import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { FeedbackUMKMType } from '@app/core/models/feedbackUMKM.model';
import { PermintaanVerifikasi } from './permintaanVerifikasi.schema';

export type FeedbackUMKMDocument = HydratedDocument<FeedbackUMKMType>;

@Schema({ timestamps: true })
export class FeedbackUMKM implements FeedbackUMKMType {
    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment: string;

    @Prop({ required: true })
    response: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PermintaanVerifikasi' })
    permintaanVerifikasiId: PermintaanVerifikasi;
}

export const FeedbackUMKMSchema = SchemaFactory.createForClass(FeedbackUMKM);
export const FeedbackUMKMModelMongo = mongoose.model<FeedbackUMKMDocument>('FeedbackUMKM', FeedbackUMKMSchema);