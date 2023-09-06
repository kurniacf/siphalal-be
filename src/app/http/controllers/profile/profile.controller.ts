import { Controller, Post, Get, Body, Query, Put, UploadedFile, UseInterceptors, NotFoundException, HttpStatus, HttpException } from "@nestjs/common";
// import { UserRepository } from "@app/infrastructure/repository/user.repository";
import { IUserRepository } from "@app/core/repository/user.repository.interface";
import { JwtService } from "@nestjs/jwt/dist";
import { Request, Inject, PreconditionFailedException } from '@nestjs/common';
import { MailerUtil } from '@app/utils/mailer.util';
import { IPictureRepository } from "@app/core/repository/picture.repository.interface";
import { PictureModel } from "@app/core/models/picture.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserModel } from "@app/core/models/user.model";
import { IUserGamificationRepository } from "@app/core/repository/userGamificatino.repository.interface";

@Controller('profile')
export class ProfileController {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IPictureRepository")
        private readonly pictureRepository: IPictureRepository,
        @Inject("IUserGamificationRepository")
        private readonly userGamificationRepository: IUserGamificationRepository
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
        if(!userId || !newUsername)
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        let user: UserModel;
        try{
            user = await this.userRepository.findById(userId);
        }
        catch{
            throw new HttpException('user not found.', HttpStatus.NOT_FOUND);
        }
        if(newUsername === user.username)
            throw new HttpException('New username is the same as the last', HttpStatus.BAD_REQUEST);
        user.username = newUsername;
        this.userRepository.save(user);
    }

    @Get('username')
    async getUsername(@Body() body: any): Promise<any> {
        const { userId } = body;
        if(!userId)
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        let user: UserModel;
        try {
            user = await this.userRepository.findById(userId);
        } catch {
            throw new PreconditionFailedException('Id does not match any user');
        }
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
        let user: UserModel;
        try{
            user = await this.userRepository.findById(userId);
        } catch {
            throw new PreconditionFailedException('Id does not match any user');
        }
        return {
            username: user.name
        }
    }

    @Put('picture')
    @UseInterceptors(FileInterceptor('file'))
    async changeProfilePicture(@UploadedFile() file :any): Promise<any> {
        if(!file.buffer) {
            throw new HttpException('Image not sent.', HttpStatus.BAD_REQUEST);
        }
        const picture = new PictureModel(null, null, new Date(), "foo", file.buffer);
        try {
            this.pictureRepository.save(picture);
        }
        catch {
            throw new HttpException('Image not saved.', HttpStatus.NOT_MODIFIED);
        }
        return {
            "message" : "Profile Picture Changed!"
        };
    }

    @Get('picture')
    async getProfilePicture(@Body() body: any): Promise<PictureModel> {
        const { pictureId } = body;
        if(!pictureId) {
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        }
        let profilePicture
        try {
            profilePicture = await this.pictureRepository.findById(pictureId);
        } catch {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
        return profilePicture;
    }

    @Get('gamification')
    async getGamificationData(@Body() body: any): Promise<any> {
        const { user_id } = body;
        if(!user_id) {
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        }
        let userGamification;
        try {
            userGamification = await this.userGamificationRepository.findByUserId(user_id)
        } catch {
            throw new HttpException('id not found.', HttpStatus.NOT_FOUND);            
        }
        return userGamification;
    }
}