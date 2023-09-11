import { LeaderboardEntryType } from "./leaderboardEntry.model";

export type LeaderboardType = {
    entries: LeaderboardEntryType[];
}

export class LeaderboardModel {
    entries: LeaderboardEntryType[];
}