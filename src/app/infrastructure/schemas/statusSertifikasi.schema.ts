import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { StatusSertifikasiType } from '@app/core/models/statusSertifikasi.model';

export type StatusSertifikasiDocument = HydratedDocument<StatusSertifikasiType>;

@Schema({ timestamps: true })
export class StatusSertifikasi implements StatusSertifikasiType {
    @Prop({ required: true })
    currentStatus: string;
    
    @Prop({ required: true })
    timestamp: Date;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    nextAction: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const StatusSertifikasiSchema = SchemaFactory.createForClass(StatusSertifikasi);
export const StatusSertifikasiModelMongo = mongoose.model<StatusSertifikasiDocument>('StatusSertifikasi', StatusSertifikasiSchema);