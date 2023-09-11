import { LeaderboardModel } from "@app/core/models/leaderboard.model";
import { LeaderboardEntryType } from "@app/core/models/leaderboardEntry.model";
import { ILeaderboardRepository } from "@app/core/repository/leaderboard.repository.interface";
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Leaderboard } from "../schemas/leaderboard.schema";
import { User } from "../schemas/user.schema";
import { UserModel } from "@app/core/models/user.model";

@Injectable()
export class LeaderBoardRepository implements ILeaderboardRepository {
    constructor(
        @InjectModel(Leaderboard.name)
        private readonly leaderboardSchema: any,
        @InjectModel(User.name) 
        private readonly userSchema: any
    ){}

    async update(): Promise<null> {
        return;
    }
    async get(): Promise<LeaderboardModel> {
        const result = await this.leaderboardSchema.findOne();
        return result.entries;
    }

}