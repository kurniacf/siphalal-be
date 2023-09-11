import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LeaderboardModel } from '@app/core/models/leaderboard.model';
import { LeaderboardEntryType } from '@app/core/models/leaderboardEntry.model';

export type LeaderboardDocument = HydratedDocument<LeaderboardModel>;

@Schema({ timestamps: true })
export class Leaderboard implements LeaderboardModel {
    @Prop({ required: false, type: Array<LeaderboardEntryType>})
    entries: LeaderboardEntryType[];
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
export const LeaderboardModelMongo = mongoose.model<LeaderboardDocument>('Leaderboard', LeaderboardSchema);