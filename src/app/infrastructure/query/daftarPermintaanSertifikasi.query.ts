import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { PermintaanVerifikasi } from "../schemas/permintaanVerifikasi.schema";
import { IDaftarPermintaanSertifikasiQuery } from "@app/application/query/daftarPermintaanSertifikasiInterface.query";

@Injectable()
export class DaftarPermintaanSertifikasiQuery implements IDaftarPermintaanSertifikasiQuery {
    constructor(
        @InjectModel(PermintaanVerifikasi.name) 
        private readonly permintaanVerifikasiSchema: any,
    ) {}

    async execute(userId:string): Promise<any[]> {
        return this.permintaanVerifikasiSchema.find({userId: userId});
    }
}