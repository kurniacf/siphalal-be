import { Controller, Post, Get, Body, Query, Param } from "@nestjs/common";
import { HttpException, UnauthorizedException, Inject } from "@nestjs/common";
import { IDaftarPermintaanSertifikasiQuery } from "@app/application/query/daftarPermintaanSertifikasiInterface.query";

@Controller('sertifikasi')
export class SertifikasiController {

    constructor(
        @Inject("IDaftarPermintaanSertifikasiQuery")
        private readonly daftarPermintaanSertifikasiQuery: IDaftarPermintaanSertifikasiQuery
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