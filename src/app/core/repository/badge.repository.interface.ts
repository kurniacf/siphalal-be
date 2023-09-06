import { BadgeModel } from "../models/badge.model";

export interface IBadgeRepository {

    save(badge: BadgeModel): Promise<any>;

    findById(id: string): Promise<any>;

}