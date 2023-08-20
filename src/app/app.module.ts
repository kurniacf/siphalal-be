import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from './http/http.module';
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        HttpModule,
    ],
    controllers: [
    ],
    providers: []
})
export class AppModule {}
