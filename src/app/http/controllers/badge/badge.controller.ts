import { IBadgeRepository } from "@app/core/repository/badge.repository.interface";
import { Controller, Post, Get, Body, Query, Param, HttpException, HttpStatus } from "@nestjs/common";
// import { UserRepository } from "@app/infrastructure/repository/user.repository";
import { Request, Inject } from '@nestjs/common';

@Controller('badge')
export class BadgeController {
    constructor(
        @Inject('IBadgeRepository')
        private readonly badgeRepository: IBadgeRepository
    ) {}

    @Get()
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
    async getBadgeByUser(@Body() body: any) {
        if(!body.user_id)
            throw new HttpException('User Id not inputted', HttpStatus.BAD_REQUEST);
        let badges;
        try{
            badges = this.badgeRepository.findByUserId(body.user_id);
        } catch{
            throw new HttpException('Badge not found.', HttpStatus.NOT_FOUND);
        }
        
        return badges;
    }
}