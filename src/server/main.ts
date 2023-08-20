import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    app.use("/", (req, res, next) => {
        console.log("This is siphalal service");
        return res.send("This is siphalal service");
    });
    await app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
    
}
bootstrap();
