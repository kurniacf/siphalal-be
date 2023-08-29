import { IsString, IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';

export class StatusSertifikasiDTO{

    @IsString()
    @IsNotEmpty()
    current_status: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    next_action: string;
}