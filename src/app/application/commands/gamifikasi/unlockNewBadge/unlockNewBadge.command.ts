import { Inject } from '@nestjs/common';
import { unlockNewBadgeRequest } from './unlockNewBadge.request';
import { IBadgeRepository } from '@app/core/repository/badge.repository.interface';
import { BadgeModel } from '@app/core/models/badge.model';

export class unlockNewBadgeCommand {
    badgeRepository: IBadgeRepository;

    constructor(
        @Inject('IBadgeRepository')
        badgeRepository: IBadgeRepository,
        ) {
            this.badgeRepository = badgeRepository;
        }

    async execute(req: unlockNewBadgeRequest): Promise<any> {
        const badgeModel = new BadgeModel(
            req.badge_type,
            req.badge_tier,
            req.badge_description,
            new Date(),
            req.visual_reference,
            new Date()
        )
        console.log(badgeModel);
        this.badgeRepository.save(badgeModel);
    }
}
