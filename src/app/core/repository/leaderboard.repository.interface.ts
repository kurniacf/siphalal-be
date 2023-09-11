import { LeaderboardModel } from "../models/leaderboard.model";

export interface ILeaderboardRepository {
    update(): Promise<null>;

    get(): Promise<LeaderboardModel>;
}