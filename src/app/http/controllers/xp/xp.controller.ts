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
        try{
            const userGamificationData = await this.userGamificationRepository.findByUserId(params.user_id);
            return {
                "xp" : userGamificationData.currentXp
            }
        }
        catch{
            return {
                "message" : "User not found"
            }
        }
    }

    @Put(':user_id')
    async updateXP(@Param() params: any, @Body() body): Promise<any>{
        const userGamification = await this.userGamificationRepository.findByUserId(params.user_id);
        const { addXP } = body;
        const addXPNum = parseInt(addXP)
        if(Number.isNaN(addXPNum))
        {
            return {
                "message" : "Operation Failed. Parameter was not a number."
            } 
        }
        userGamification.currentXp += addXPNum;
        try{
            this.userGamificationRepository.save(userGamification);
        }
        catch{
            return {
                "message" : "Operation Failed."
            }
        }

        return {
            "message" : "Success."
        }
    }

}