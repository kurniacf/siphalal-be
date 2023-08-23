import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MissionTemplateType } from "@app/core/models/missionTemplate.model";

export type MissionTemplateDocument = HydratedDocument<MissionTemplateType>;

@Schema({ timestamps: true })
export class MissionTemplate implements MissionTemplateType {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    xpReward: number;

    @Prop({ required: true })
    completionCriteria: string;

    @Prop({ required: true })
    visualReference: string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const MissionTemplateSchema = SchemaFactory.createForClass(MissionTemplate);
export const MissionTemplateModelMongo = mongoose.model<MissionTemplateDocument>('MissionTemplate', MissionTemplateSchema);