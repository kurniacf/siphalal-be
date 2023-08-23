import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from './user.schema';
import { PermintaanVerifikasiType } from '@app/core/models/permintaanVerifikasi.model';

export type PermintaanVerifikasiDocument = HydratedDocument<PermintaanVerifikasiType>;

@Schema({ timestamps: true })
export class PermintaanVerifikasi implements PermintaanVerifikasiType {
    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    startAjuanDate: Date;

    @Prop({ required: true })
    setujuAjuanDate: Date;

    @Prop({ required: true })
    tolakAjuanDate: Date;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const PermintaanVerifikasiSchema = SchemaFactory.createForClass(PermintaanVerifikasi);
export const PermintaanVerifikasiModelMongo = mongoose.model<PermintaanVerifikasiDocument>('PermintaanVerifikasi', PermintaanVerifikasiSchema);