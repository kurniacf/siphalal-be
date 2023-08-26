import { IUserGamificationRepository } from "@app/core/repository/userGamificatino.repository.interface";
import { Controller, Get, Param, Inject, Put, Body } from "@nestjs/common";

@Controller('xp')
export class XPController {
    constructor(
        @Inject('IUserGamificationRepository')
        private readonly userGamificationRepository: IUserGamificationRepository
    ){}

    @Get()
    async check(): Promise<{message: string}>{
        return {
            message: "Jalan"
        }
    }

    @Get(':user_id')
    async getXPByUserID(@Param() params: any): Promise<any>{
        return this.userGamificationRepository.findByUserId(params.user_id);
    }

    @Put(':user_id')
    async updateXP(@Param() params: any, @Body() body): Promise<any>{
        const userGamification = await this.userGamificationRepository.findByUserId(params.user_id);
        const { addXP } = body;
        userGamification.currentXp += addXP;
        this.userGamificationRepository.save(userGamification);
    }

}