import { Inject, HttpStatus } from '@nestjs/common';
import { UnlockNewBadgeRequest } from './unlockNewBadge.request';
import { IBadgeRepository } from '@app/core/repository/badge.repository.interface';
import { BadgeModel } from '@app/core/models/badge.model';
import { IUserRepository } from '@app/core/repository/user.repository.interface';
import { HttpException } from '@nestjs/common/exceptions';
export class UnlockNewBadgeCommand {
    badgeRepository: IBadgeRepository;
    userRepository: IUserRepository;

    constructor(
        @Inject('IBadgeRepository')
        badgeRepository: IBadgeRepository,
        @Inject('IUserRepository')
        userRepository: IUserRepository        
        )
        {
            this.badgeRepository = badgeRepository;
            this.userRepository = userRepository;
        }

    async execute(req: UnlockNewBadgeRequest): Promise<any> {
        const user = await this.userRepository.findById(req.user_id);
        if(user == null) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        const badgeModel = new BadgeModel(
            req.badge_type,
            req.badge_tier,
            req.badge_description,
            new Date(),
            req.visual_reference,
            user,
            new Date()
        )
        this.badgeRepository.save(badgeModel);
    }
}
