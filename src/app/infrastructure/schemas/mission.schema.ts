import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { MissionTemplate } from './missionTemplate.schema';
import { MissionType } from '@app/core/models/mission.model';

export type MissionDocument = HydratedDocument<MissionType>;

@Schema({ timestamps: true })
export class Mission implements MissionType {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    assignedDate: Date;

    @Prop({ required: true })
    completedDate: Date;

    @Prop({ required: true })
    deadline: Date;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MissionTemplate' })
    missionTemplateId: MissionTemplate;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);
export const MissionModelMongo = mongoose.model<MissionDocument>('Mission', MissionSchema);