import { Controller, Get, Param } from "@nestjs/common";

@Controller('xp')
export class XPController {
    constructor(
        
    ){}

    @Get()
    async check(): Promise<{message: string}>{
        return {
            message: "Jalan"
        }
    }

    @Get(':user_id')
    async getXPByUserID(@Param() user_id: string): Promise<any>{

    }

}