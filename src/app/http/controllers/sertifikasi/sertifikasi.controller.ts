import { Controller, Post, Get, Body, Query, Param } from "@nestjs/common";
import { HttpException, UnauthorizedException, Inject } from "@nestjs/common";
import { IDaftarPermintaanSertifikasiQuery } from "@app/application/query/daftarPermintaanSertifikasiInterface.query";
import { Request } from "@nestjs/common";

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

    @Get('history')
    async daftarPermintaanSertifikasi(@Request() req): Promise<any> {
        const user = req.user;
        return this.daftarPermintaanSertifikasiQuery.execute(user.user_id);
    }

    @Get('history/:id')
    async detailPermintaanSertifikasi(@Param('id') id: string): Promise<any> {}
}