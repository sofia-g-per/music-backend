import { IsEmail, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

export class LoginDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}