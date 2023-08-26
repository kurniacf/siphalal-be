import {NestMiddleware, Injectable, BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, Next } from '@nestjs/common';

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService
    ) {}

    use(@Request() req , res: Response, next: ()=>void) {
        //get header barear token
        const bearerToken = req.headers.authorization;
        console.log('bearerToken', bearerToken);
        if(!bearerToken) {
            throw new BadRequestException('Token not found');
        }

        //get token
        const token = bearerToken.split(' ')[1];
        if(!token) {
            throw new BadRequestException('Token not found');
        }

        //validate token
        try {
            const payload = this.jwtService.verify(token);
            req.user = payload;
        } catch (error) {
            console.log('error', error);
            throw new BadRequestException('Token not valid');
        }

        next();
    }
}