import { PermintaanSertifikasiRepository } from "@app/infrastructure/repository/daftarPermintaanSertifikasi.repository";
import { HttpException } from "@nestjs/common";

export class MulaiSertifikasiCommand{
    constructor(
        private readonly permintaanSertifikasiRepository: PermintaanSertifikasiRepository
    ) {}

    async execute(id: string): Promise<any> {
        const permintaanSertifikasi = await this.permintaanSertifikasiRepository.findById(id);
        if(!permintaanSertifikasi) {
            throw new HttpException('Permintaan sertifikasi tidak ditemukan', 404);
        }
        permintaanSertifikasi.status = 'mulai';
        // TODO : set ajuan date by now and use id status "Mulai"
        permintaanSertifikasi.startAjuanDate = new Date();
        return this.permintaanSertifikasiRepository.update(permintaanSertifikasi);
    }
}