import { Controller, Post, Get, Body } from "@nestjs/common";
import { UserRepository } from "@app/infrastructure/repository/user.repository";
import { UserModel } from "@app/core/models/user.model";
import { JwtService } from "@nestjs/jwt/dist";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "@app/http/validation/auth/loginDto";
import { RegisterDto } from "@app/http/validation/auth/registerDto";
import { HttpException, UnauthorizedException } from "@nestjs/common";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService
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
}