import { IStatusSertifikasiRepository } from "@app/core/repository/statusSertifikasi.repository.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { StatusSertifikasi } from "../schemas/statusSertifikasi.schema";
import { StatusSertifikasiModel } from "@app/core/models/statusSertifikasi.model";

@Injectable()
export class StatusSertifikasiRepository implements IStatusSertifikasiRepository {
    constructor(
        @InjectModel(StatusSertifikasi.name)
        private readonly statusSertifikasiSchema: any,
    ){}

    save(statusSertifikasi: StatusSertifikasiModel): Promise<any> {
        return this.statusSertifikasiSchema.create(statusSertifikasi);
    }
    update(statusSertifikasi: StatusSertifikasiModel, idStatus: string): Promise<any> {
        return this.statusSertifikasiSchema.updateOne({_id: idStatus}, statusSertifikasi);
    }
    delete(id: string): Promise<any> {
        return this.statusSertifikasiSchema.deleteOne({_id: id});
    }
    findById(id: string): Promise<any> {
        return this.statusSertifikasiSchema.findOne({_id: id});
    }
    findAll(): Promise<any> {
        return this.statusSertifikasiSchema.find();
    }
}