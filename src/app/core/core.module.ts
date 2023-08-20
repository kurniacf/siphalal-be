import { Module } from "@nestjs/common";
import { UserModel } from "./models/user.model";

@Module({
    providers: [
        UserModel
    ],
    exports: [
        UserModel
    ]
})
export class CoreModule {}