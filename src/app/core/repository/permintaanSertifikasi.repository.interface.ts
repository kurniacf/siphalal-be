import { PermintaanVerifikasiModel } from "../models/permintaanVerifikasi.model";

export interface IPermintaanSertifikasiRepository{
    save(permintaanVerifikasi: PermintaanVerifikasiModel): Promise<any>;

    update(permintaanVerifikasi: PermintaanVerifikasiModel): Promise<any>;

    delete(id: string): Promise<any>;

    findById(id: string): Promise<any>;
}