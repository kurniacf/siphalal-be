import { Controller, Post, Get, Body, Query } from "@nestjs/common";
import { UserRepository } from "@app/infrastructure/repository/user.repository";
import { UserModel } from "@app/core/models/user.model";
import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "@app/http/validation/auth/loginDto";
import { RegisterDto } from "@app/http/validation/auth/registerDto";
import { HttpException, UnauthorizedException } from "@nestjs/common";
import { Request } from '@nestjs/common';
import { MailerUtil } from '@app/utils/mailer.util';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private mailerUtil: MailerUtil
    ) {}

    @Get('check')
    async check(): Promise<any> {
        return {
            message: 'Auth controller is working'
        };
    }

    @Post('login')
    async login(@Body() body: LoginDto): Promise<{token: string}> {

        const {email, password} = body;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const payload = { 
            user_id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            region_kecamatan: user.region_kecamatan,
            region_city: user.region_city,
            profilePictureLink: user.profilePictureLink,
            loginAt: user.loginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<{userSaved:any}> {
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(body.password, salt);
        body.password = hash;

        const newUser = new UserModel(
            body.username,
            body.name,
            body.email,
            body.password,
            body.region_kecamatan,
            body.region_city
        );

        return this.userRepository.save(newUser);
    }

    @Get('whoami')
    async whoami(@Request() req): Promise<any> {
        const user = await this.userRepository.findById(req.user.user_id);
        if (!user) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const payload = { 
            user_id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            region_kecamatan: user.region_kecamatan,
            region_city: user.region_city,
            profilePictureLink: user.profilePictureLink,
            loginAt: user.loginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return payload;
    }
    
    @Post('forgot-password')
    async forgotPassword(@Request() req): Promise<any> {
        const {new_password} = req.body;
        const user = await this.userRepository.findByEmail(req.user.email);
        if (!user) {
            throw new HttpException('User not found', 404);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        const tokenPayload = {
            userId: user._id,
            newPassword: hashedPassword
        }
        const tokenForgotPassword = this.jwtService.sign(tokenPayload);
        user.tokenForgotPassword = tokenForgotPassword;
        await user.save();

        return {
            message: 'Check your email to reset your password'
        };
    }

    @Get('reset-password')
    async resetPassword(@Query() query : any): Promise<any> {
        const { token, email } = query;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new HttpException('User not found', 404);
        }

        if(token != user.tokenForgotPassword) {
            throw new HttpException('Token not valid', 404);
        }

        //decode token
        const tokenPayload = this.jwtService.decode(token, {json: true, complete: true}) as any;

        user.password = tokenPayload.payload.newPassword;
        await user.save();

        return {
            message: 'Reset password success'
        };
    }
}