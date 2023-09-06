import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Badge } from "../schemas/badge.schema";
import { BadgeModel } from "@app/core/models/badge.model";
import { IBadgeRepository } from "@app/core/repository/badge.repository.interface";
@Injectable()
export class BadgeRepository implements IBadgeRepository {
    constructor(
        @InjectModel(Badge.name) 
        private readonly badgeSchema: any,
    ) {}
    async save(badge: BadgeModel): Promise<any> {
        const createdBadge = new this.badgeSchema(badge);
        const badgeSaved = createdBadge.save();
        return badgeSaved || {};
    }
    async findById(id: string): Promise<any> {
        return this.badgeSchema.findById(id);
    }
    async findByUserId(id: string): Promise<any> {
        const badges = await this.badgeSchema.find({'userId' : id});
        if(badges.length == 0)
            throw new HttpException('Badge not found', HttpStatus.NOT_FOUND);
        return badges;
    }
}