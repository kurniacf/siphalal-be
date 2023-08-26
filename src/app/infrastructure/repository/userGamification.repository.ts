import { IUserGamificationRepository } from "@app/core/repository/userGamificatino.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { UserGamificationModel } from "@app/core/models/userGamification.model";
import { InjectModel } from "@nestjs/mongoose";
import { UserGamification } from "../schemas/userGamification.schema";
@Injectable()
export class userGamificationRepository implements IUserGamificationRepository {
    constructor(
        @InjectModel(UserGamification.name)
        private readonly userGamificationSchema: any
    ){}

    save(userGamification: UserGamificationModel): Promise<any>
    {
        const createdUserGamification = new this.userGamificationSchema(userGamification);
        const userGamificationSaved = createdUserGamification.save();
        return userGamificationSaved || {};
    }

    findById(Id: string): Promise<UserGamificationModel>
    {
        return this.userGamificationSchema.findById(Id);
    }
    findByUserId(userId: string): Promise<UserGamificationModel>
    {
        return this.userGamificationSchema.findOne({userId: userId});
    }
}