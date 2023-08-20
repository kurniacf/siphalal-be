import {Module} from "@nestjs/common";
import { AuthController } from "./controllers/auth/auth.controller";
import { InfrastructureModule } from "@app/infrastructure/infra.module";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        InfrastructureModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string | number>('JWT_EXPIRATION_TIME'),
                }
            }),
        }),
    ],
    controllers: [
        AuthController
    ],
})

export class HttpModule {}