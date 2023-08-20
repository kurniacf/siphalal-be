import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repository/user.repository";
import { CoreModule } from "@app/core/core.module";
import { UserSchema } from "./schemas/user.schema";

@Module({
    imports: [
        CoreModule,
        MongooseModule.forFeature([
            { name: "User", schema: UserSchema }
        ])
    ],
    providers: [
        UserRepository
    ],
    exports: [
        UserRepository
    ]
})
export class InfrastructureModule {}