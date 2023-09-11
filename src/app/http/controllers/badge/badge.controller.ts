import { UnlockNewBadgeCommand } from "@app/application/commands/gamifikasi/unlockNewBadge/unlockNewBadge.command";
import { UnlockNewBadgeRequest } from "@app/application/commands/gamifikasi/unlockNewBadge/unlockNewBadge.request";
import { IBadgeRepository } from "@app/core/repository/badge.repository.interface";
import { IUserRepository } from "@app/core/repository/user.repository.interface";
import { Controller, Post, Get, Body, Query, Param, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Inject } from '@nestjs/common';

@Controller('badge')
export class BadgeController {
    constructor(
        @Inject('IBadgeRepository')
        private readonly badgeRepository: IBadgeRepository,
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    @Get('check')
    async check() {
        return {
            "message" : "Controller Up!"
        };
    }

    @Get('badge')
    async getBadge(@Body() body: any) {
        if(!body.badge_id)
            throw new HttpException('Badge Id not inputted', HttpStatus.BAD_REQUEST);

        let badge;

        try {
            badge = await this.badgeRepository.findById(body.badge_id);
            if(!badge)
                throw new HttpException('Badge not found.', HttpStatus.NOT_FOUND);
            
        } catch {
            throw new HttpException('Badge not found.', HttpStatus.NOT_FOUND);
        }
        return badge;
    }

    @Get('user')
    async getBadgeByUser(@Request() req: any) {
        const { user_id } = req.user
        if(!user_id)
            throw new HttpException('User Id not inputted', HttpStatus.BAD_REQUEST);
        let badges;
        try{
            badges = this.badgeRepository.findByUserId(user_id);
        } catch{
            throw new HttpException('Badge not found.', HttpStatus.NOT_FOUND);
        }
        
        return badges;
    }

    // TODO: Guard clauses
    @Post('user')
    async newBadgeOnUser(@Body() body: any, @Request() req: any) {
        // if(!body.user_id || !body.badge_id)
        //     throw new HttpException('Incorrect Input, please refer to the documentation.', HttpStatus.BAD_REQUEST);
        try {
            const unlockNewBadgeRequest: UnlockNewBadgeRequest = {
                user_id: req.user.user_id,
                badge_description: body.description,
                badge_tier: body.badge_tier,
                badge_type: body.badge_type,
                visual_reference: body.visual_reference  
            } 
            
            const command = new UnlockNewBadgeCommand(this.badgeRepository, this.userRepository).execute(unlockNewBadgeRequest);
        } catch {
            throw new HttpException('Input incorrect', HttpStatus.BAD_REQUEST);
        }
        return {
            "message" : "success!"
        };
    }
}