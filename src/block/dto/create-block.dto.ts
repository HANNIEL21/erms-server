import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsIn, IsNumber } from 'class-validator'

export class CreateBlockDto {
    @ApiProperty({
        description: 'Block name (e.g. TitleText, BodyText, LogoImage)',
        example: 'TitleText',
    })
    @IsString()
    @IsNotEmpty({ message: 'Block name is required.' })
    name: string

    @ApiProperty({
        description: 'Type of block',
        example: 'typography',
        enum: ['typography', 'image', 'table', 'signature', 'date'],
    })
    @IsString()
    @IsNotEmpty()
    @IsIn(['typography', 'image', 'table', 'signature', 'date'], {
        message: 'Invalid block type',
    })
    blockType: string

    @ApiProperty({
        description: 'Default value or placeholder for the block',
        example: 'Dear {{name}}',
        required: false,
    })
    @IsString()
    @IsOptional()
    defaultValue?: string

    @ApiProperty({
        description: 'Whether the block supports dynamic variables',
        example: true,
    })
    @IsBoolean()
    isDynamic: boolean

    @ApiProperty({
        description: 'User ID of the creator',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty({ message: "UserId is required." })
    createdById: number
}
