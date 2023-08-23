import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { DokumenSertifikasiHalalType } from '@app/core/models/dokumenSertifikasiHalal.model';

export type DokumenSertifikasiHalalDocument = HydratedDocument<DokumenSertifikasiHalalType>;

@Schema({ timestamps: true })
export class DokumenSertifikasiHalal implements DokumenSertifikasiHalalType {
    @Prop({ required: true })
    filePath: string;

    @Prop({ required: true })
    issueDate: Date;

    @Prop({ required: true })
    expirationDate: Date;

    @Prop({ required: true })
    documentType: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const DokumenSertifikasiHalalSchema = SchemaFactory.createForClass(DokumenSertifikasiHalal);
export const DokumenSertifikasiHalalModelMongo = mongoose.model<DokumenSertifikasiHalalDocument>('DokumenSertifikasiHalal', DokumenSertifikasiHalalSchema);