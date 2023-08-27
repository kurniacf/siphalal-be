import { Controller, Post, Get, Body, Query, Put } from "@nestjs/common";
// import { UserRepository } from "@app/infrastructure/repository/user.repository";
import { IUserRepository } from "@app/core/repository/user.repository.interface";
import { JwtService } from "@nestjs/jwt/dist";
import { Request, Inject, PreconditionFailedException } from '@nestjs/common';
import { MailerUtil } from '@app/utils/mailer.util';

@Controller('profile')
export class ProfileController {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}

    @Get()
    async check(): Promise<any> {
        return {
            message: 'Profile controller is working'
        };
    }

    @Put('username')
    async changeUsername(@Body() body: any): Promise<any> {
        const { userId, newUsername } = body;
        const user = await this.userRepository.findById(userId);
        if(newUsername === user.username)
            throw new PreconditionFailedException('new username is the same as the last');
        user.username = newUsername;
        this.userRepository.save(user);
    }

    @Get('username')
    async getUsername(@Body() body: any): Promise<any> {
        const { userId } = body;
        const user = await this.userRepository.findById(userId);
        if(!user)
            return new PreconditionFailedException('Id does not match any user');
        return {
            username: user.username
        }
    }

    @Put('name')
    async changeName(@Body() body: any): Promise<any> {
        const { userId, newName } = body;
        const user = await this.userRepository.findById(userId);
        if(newName === user.name)
            throw new PreconditionFailedException('new name is the same as the last');
        user.name = newName;
        this.userRepository.save(user);
    }

    @Get('name')
    async getName(@Body() body: any): Promise<any> {
        const { userId } = body;
        const user = await this.userRepository.findById(userId);
        if(!user)
            return new PreconditionFailedException('Id does not match any user');
        return {
            username: user.name
        }
    }
}