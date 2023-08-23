import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { ProdukUMKMType } from '@app/core/models/produkUMKM.model';
import { UMKM } from './umkm.schema';
import { StatusSertifikasi } from './statusSertifikasi.schema';
import { DokumenSertifikasiHalal } from './dokumenSertifikasiHalal.schema';

export type ProdukUMKMDocument = HydratedDocument<ProdukUMKMType>;

@Schema({ timestamps: true })
export class ProdukUMKM implements ProdukUMKMType {

    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    productCategory: string;

    @Prop({ required: true })
    statusHalal: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UMKM' })
    umkmId: UMKM;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StatusSertifikasi' })
    statusSertifikasiId: StatusSertifikasi;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DokumenSertifikasiHalal' })
    dokumenSertifikasiHalalId: DokumenSertifikasiHalal;
}

export const ProdukUMKMSchema = SchemaFactory.createForClass(ProdukUMKM);
export const ProdukUMKMModelMongo = mongoose.model<ProdukUMKMDocument>('ProdukUMKM', ProdukUMKMSchema);