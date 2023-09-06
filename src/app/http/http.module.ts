import {Module} from "@nestjs/common";

import { InfrastructureModule } from "@app/infrastructure/infra.module";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { ConfigService } from "@nestjs/config";
import {MiddlewareConsumer, RequestMethod, NestModule} from "@nestjs/common";
import {ApiTokenCheckMiddleware} from "@app/http/middleware/apiTokenCheck.middleware";
import { UtilModule } from "@app/utils/util.module";

//controllers
import { AuthController } from "./controllers/auth/auth.controller";
import { SertifikasiController } from "./controllers/sertifikasi/sertifikasi.controller";
import { XPController } from "./controllers/xp/xp.controller";
import { TestController } from "./controllers/auth/test.controller";
import {StatusSertifikasiController} from "./controllers/sertifikasi/statusSertifikasi.controller";
import { ProfileController } from "./controllers/profile/profile.controller";
import { BadgeController } from "./controllers/badge/badge.controller";

@Module({
    imports: [
        InfrastructureModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
                }
            }),
        }),
        UtilModule
    ],
    controllers: [
        AuthController,
        XPController,
        SertifikasiController,
        TestController,
        StatusSertifikasiController,
        ProfileController,
        BadgeController
    ],
})
export class HttpModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                ApiTokenCheckMiddleware
            )
            .exclude(
                { path: 'auth/login', method: RequestMethod.POST },
                { path: 'auth/register', method: RequestMethod.POST },
                { path: 'auth/forgot-password', method: RequestMethod.POST },
                { path: 'auth/reset-password', method: RequestMethod.GET },
            )
            .forRoutes(
                AuthController,
                SertifikasiController,
            );
    }
}