import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTemplateDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsNotEmpty()
    version: string

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

    @IsInt()
    documentId: number

    @IsInt()
    createdById: number
}