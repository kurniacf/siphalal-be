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

    @Get(':badge_id')
    async getBadge(@Param() params: any) {
        if(!params.badge_id)
            throw new HttpException('Badge Id not inputted', HttpStatus.BAD_REQUEST);

        const badge = await this.badgeRepository.findById(params.badge_id);
        return badge;
    }
}