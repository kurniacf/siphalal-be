import { StatusSertifikasiModel } from "../models/statusSertifikasi.model";

export interface IStatusSertifikasiRepository{
    save(statusSertifikasi: StatusSertifikasiModel): Promise<any>;

    update(statusSertifikasi: StatusSertifikasiModel, idStatus: string): Promise<any>;

    delete(id: string): Promise<any>;

    findById(id: string): Promise<any>;

    findAll(): Promise<any>;
}