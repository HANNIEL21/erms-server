import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateComboDto {

    @IsString()
    @IsNotEmpty()
    firstname: string

    @IsString()
    @IsOptional()
    middlename?: string

    @IsString()
    @IsNotEmpty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    matric_number: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    phone_number: string

    @IsBoolean()
    @IsNotEmpty()
    isPrinted: boolean

    @IsNumber()
    @IsNotEmpty()
    createdById: number
}
