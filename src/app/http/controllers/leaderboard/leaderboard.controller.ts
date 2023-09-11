import { Controller, Get, Inject, Put } from "@nestjs/common";
import { ILeaderboardRepository } from "@app/core/repository/leaderboard.repository.interface";

@Controller('leaderboard')
export class LeaderboardController {
    constructor(
        @Inject('ILeaderboardRepository')
        private readonly leaderboardRepository: ILeaderboardRepository
    ){}

    @Get('check')
    async check() {
        return {
            "message" : "Leaderboard Controller Up."
        };
    }

    @Get()
    async getRanking() {
        return await this.leaderboardRepository.get();
    }

    @Put()
    async updateRanking() {
        this.leaderboardRepository.update();
    }
}