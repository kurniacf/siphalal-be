import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}