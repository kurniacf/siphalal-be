import { Controller, Post, Get, Body, Query, Param } from "@nestjs/common";
import { HttpException, UnauthorizedException } from "@nestjs/common";
import { DaftarPermintaanSertifikasiQuery } from "@app/infrastructure/query/daftarPermintaanSertifikasi.query";

@Controller('sertifikasi')
export class SertifikasiController {
    constructor(
        private readonly daftarPermintaanSertifikasiQuery: DaftarPermintaanSertifikasiQuery
    ) {}

    @Get()
    async check(): Promise<any> {
        return {
            message: 'Sertifikasi controller is working'
        };
    }

    @Get(':user_id')
    async daftarPermintaanSertifikasi(@Param() params: any): Promise<any> {
        console.log(params);
        return this.daftarPermintaanSertifikasiQuery.execute(params.user_id);
    }
}