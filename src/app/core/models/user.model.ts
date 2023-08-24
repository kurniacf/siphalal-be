import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export type UserModelType = {
    _id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    profilePictureLink: string;
    region_kecamatan: string;
    region_city: string;
    loginAt: Date;
    tokensEmail: string;
    tokensLogin: string;
    tokenForgotPassword: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel implements UserModelType {

    _id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    profilePictureLink: string;
    region_kecamatan: string;
    region_city: string;
    loginAt: Date;
    tokensEmail: string;
    tokensLogin: string;
    tokenForgotPassword: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(username: string, name:string, email:string, password:string, region_kecamatan:string, region_city:string, profilePictureLink?:string, loginAt?:Date, tokensEmail?:string, tokensLogin?:string, tokenForgotPassword?:string, createdAt?:Date, updatedAt?:Date) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.region_kecamatan = region_kecamatan;
        this.region_city = region_city;
        this.profilePictureLink = profilePictureLink || '';
        this.loginAt = loginAt || new Date();
        this.tokensEmail = tokensEmail || '';
        this.tokensLogin = tokensLogin || '';
        this.tokenForgotPassword = tokenForgotPassword || '';
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    getUserName() {
        return this.name;
    }

    getUserEmail() {
        return this.email;
    }

    getUserPassword() {
        return this.password;
    }

    getUserTokenForgotPassword() {
        return this.tokenForgotPassword;
    }
}