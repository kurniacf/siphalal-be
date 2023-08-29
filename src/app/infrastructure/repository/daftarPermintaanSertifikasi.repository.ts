import {IPermintaanSertifikasiRepository} from '../../core/repository/permintaanSertifikasi.repository.interface';
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { PermintaanVerifikasi } from "../schemas/permintaanVerifikasi.schema";
import { PermintaanVerifikasiModel } from "@app/core/models/permintaanVerifikasi.model";

@Injectable()
export class PermintaanSertifikasiRepository implements IPermintaanSertifikasiRepository {
    constructor(
        @InjectModel(PermintaanVerifikasi.name)
        private readonly permintaanVerifikasiSchema: any,
    ) {}

    save(permintaanVerifikasi: PermintaanVerifikasiModel): Promise<any> {
        return this.permintaanVerifikasiSchema.create(permintaanVerifikasi);
    }
    update(permintaanVerifikasi: PermintaanVerifikasiModel): Promise<any> {
        return this.permintaanVerifikasiSchema.updateOne({_id: permintaanVerifikasi._id}, permintaanVerifikasi);
    }
    delete(id: string): Promise<any> {
        return this.permintaanVerifikasiSchema.deleteOne({_id: id});
    }
    findById(id: string): Promise<any> {
        return this.permintaanVerifikasiSchema.findOne({_id: id});
    }    
}
