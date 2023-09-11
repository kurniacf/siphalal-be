import { IUserGamificationRepository } from "@app/core/repository/userGamificatino.repository.interface";
import { Controller, Get, Param, Inject, Put, Body, Request } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";

@Controller('xp')
export class XPController {
    constructor(
        @Inject('IUserGamificationRepository')
        private readonly userGamificationRepository: IUserGamificationRepository
    ){}

    @Get('check')
    async check(): Promise<{message: string}>{
        return {
            message: "XPController is running"
        }
    }

    @Get()
    async getXPByUserID(@Request() req: any): Promise<any>{
        try{
            const userGamificationData = await this.userGamificationRepository.findByUserId(req.user.user_id);
            return {
                "xp" : userGamificationData.currentXp
            }
        }
        catch{
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
    }

    @Put()
    async updateXP(@Request() req: any, @Body() body): Promise<any>{
        const userGamification = await this.userGamificationRepository.findByUserId(req.user.user_id);
        const { addXP } = body;
        const addXPNum = parseInt(addXP)
        if(Number.isNaN(addXPNum))
        {
            throw new HttpException('XP was not a number', HttpStatus.BAD_REQUEST);
        }
        userGamification.currentXp += addXPNum;
        try{
            this.userGamificationRepository.save(userGamification);
        }
        catch{
            throw new HttpException('Operation Failed.', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return {
            "message" : "Success."
        }
    }

}