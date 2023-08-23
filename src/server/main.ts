import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import {ValidationPipe} from "@nestjs/common";
import { load } from 'ts-dotenv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    const env = load({
        PORT: String,
    });
    await app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
    
}
bootstrap();
