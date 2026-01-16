import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'User first name',
        example: 'John'
    })
    @IsString()
    @IsNotEmpty({ message: 'Firstname is required' })
    firstname: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Doe'
    })
    @IsString()
    @IsNotEmpty({ message: 'Lastname is required' })
    lastname: string;

    @ApiProperty({
        description: "Role ID",
    })
    @IsNumber()
    @IsOptional()
    roleId: number;

    @ApiProperty({
        description: "User's email",
        example: 'John'
    })
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @ApiProperty({
        description: 'User password (min 8 characters)',
        example: 'SecurePass123!',
        minLength: 8,
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    password: string;
}
