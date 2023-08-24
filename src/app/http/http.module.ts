import {Module} from "@nestjs/common";
import { AuthController } from "./controllers/auth/auth.controller";
import { InfrastructureModule } from "@app/infrastructure/infra.module";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { ConfigService } from "@nestjs/config";
import {MiddlewareConsumer, RequestMethod, NestModule} from "@nestjs/common";
import {ApiTokenCheckMiddleware} from "@app/http/middleware/apiTokenCheck.middleware";
import { UtilModule } from "@app/utils/util.module";

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
        AuthController
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
                { path: 'auth/reset-password', method: RequestMethod.GET },
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}