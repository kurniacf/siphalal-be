import { Controller, Get, Body, Put, UploadedFile, UseInterceptors, HttpStatus, HttpException} from "@nestjs/common";
import { IUserRepository } from "@app/core/repository/user.repository.interface";
import { Request, Inject, PreconditionFailedException } from '@nestjs/common';
import { IPictureRepository } from "@app/core/repository/picture.repository.interface";
import { PictureModel } from "@app/core/models/picture.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserModel } from "@app/core/models/user.model";
import { IUserGamificationRepository } from "@app/core/repository/userGamificatino.repository.interface";

@Controller('user')
export class UserController {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IPictureRepository")
        private readonly pictureRepository: IPictureRepository,
        @Inject("IUserGamificationRepository")
        private readonly userGamificationRepository: IUserGamificationRepository
    ) {}

    @Get('check')
    async check(): Promise<any> {
        return {
            message: 'User controller is working'
        };
    }

    @Put('username')
    async changeUsername(@Request() req: any, @Body() body: any): Promise<any> {
        const { newUsername } = body;
        const { user_id } = req.user;
        if(!user_id || !newUsername)
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        let user: UserModel;
        try{
            user = await this.userRepository.findById(user_id);
        }
        catch{
            throw new HttpException('user not found.', HttpStatus.NOT_FOUND);
        }
        if(newUsername === user.username)
            throw new HttpException('New username is the same as the last', HttpStatus.BAD_REQUEST);
        user.username = newUsername;
        this.userRepository.save(user);
        return {
            "message": "Success!"
        };
    }

    @Get('username')
    async getUsername(@Request() req: any): Promise<any> {
        const { user_id } = req.user;
        if(!user_id)
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        let user: UserModel;
        try {
            user = await this.userRepository.findById(user_id);
        } catch {
            throw new PreconditionFailedException('Id does not match any user');
        }
        return {
            username: user.username
        }
    }

    @Put('name')
    async changeName(@Request() req: any, @Body() body: any): Promise<any> {
        const { newName } = body;
        const { user_id } = req.user;
        const user = await this.userRepository.findById(user_id);
        if(newName === user.name)
            throw new PreconditionFailedException('new name is the same as the last');
        user.name = newName;
        this.userRepository.save(user);
        return {
            "message": "Success!"
        };
    }

    @Get('name')
    async getName(@Request() req: any): Promise<any> {
        const { user_id } = req.user;
        let user: UserModel;
        try{
            user = await this.userRepository.findById(user_id);
        } catch {
            throw new PreconditionFailedException('Id does not match any user');
        }
        return {
            name: user.name
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
    async getGamificationData(@Request() req: any): Promise<any> {
        const { user_id } = req.user;
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

    @Get('profile')
    async getUserData(@Request() req: any): Promise<any> {
        const { user_id } = req.user;
        if(!user_id) {
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        }
        let user;
        try {
            user = await this.userRepository.findById(user_id)
        } catch {
            throw new HttpException('id not found.', HttpStatus.NOT_FOUND);            
        }
        return user;
    }

    @Get('alldata')
    async GetAllUserData(@Request() req:any): Promise<any> {
        const { user_id } = req.user;
        console.log(user_id);
        if(!user_id) {
            throw new HttpException('Arguments invalid.', HttpStatus.BAD_REQUEST);
        }
        let user;
        let userGamification;
        try {
            user = await this.userRepository.findById(user_id)
            userGamification = await this.userGamificationRepository.findByUserId(user_id);
        } catch {
            throw new HttpException('id not found.', HttpStatus.NOT_FOUND);            
        }
        return {
            user,
            userGamification
        };
    }
}