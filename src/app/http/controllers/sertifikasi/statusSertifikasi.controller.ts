import { Controller, Post, Get, Body, Query, Param, Put, Delete } from "@nestjs/common";
import { HttpException, UnauthorizedException, Inject } from "@nestjs/common";
import { IStatusSertifikasiRepository } from "@app/core/repository/statusSertifikasi.repository.interface";
import { StatusSertifikasiDTO } from "@app/http/validation/sertifikasi/statusSertifikasiDTO";
import { StatusSertifikasiModel } from "@app/core/models/statusSertifikasi.model";

@Controller('status-sertifikasi')
export class StatusSertifikasiController {
    constructor(
        @Inject("IStatusSertifikasiRepository")
        private readonly statusSertifikasiRepository: IStatusSertifikasiRepository
    ) {}

    @Get()
    async getAllStatuses(): Promise<any> {
        return this.statusSertifikasiRepository.findAll();
    }

    @Get(':id')
    async getStatusById(@Param('id') id: string): Promise<any> {
        return this.statusSertifikasiRepository.findById(id);
    }

    @Post()
    async saveStatus(@Body() body: StatusSertifikasiDTO): Promise<any> {
        const newStatus = new StatusSertifikasiModel(
            body.current_status,
            body.description,
            body.next_action
        );
        return this.statusSertifikasiRepository.save(newStatus);
    }

    @Put(':id')
    async updateStatus(@Param('id') id: string, @Body() body: any): Promise<any> {
        return this.statusSertifikasiRepository.update(body, id);
    }

    @Delete(':id')
    async deleteStatus(@Param('id') id: string): Promise<any> {
        return this.statusSertifikasiRepository.delete(id);
    }
}