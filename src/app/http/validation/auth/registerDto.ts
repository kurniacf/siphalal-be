import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    @IsNotEmpty()
    region_kecamatan: string;
    
    @IsString()
    @IsNotEmpty()
    region_city: string;
}