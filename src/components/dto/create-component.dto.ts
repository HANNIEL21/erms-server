import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsIn, IsNumber } from 'class-validator'

export class CreateComponentDto {
    @ApiProperty({
        description: 'Component name (e.g. Header, GridLayout, SignatureSection)',
        example: 'Header',
    })
    @IsString()
    @IsNotEmpty({ message: 'Component name is required.' })
    name: string

    @ApiProperty({
        description: 'Optional description of the component',
        example: 'Top section of the document containing title and metadata',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: 'Layout type of the component',
        example: 'column',
        enum: ['column', 'row', 'grid'],
    })
    @IsString()
    @IsIn(['column', 'row', 'grid'], {
        message: 'layoutType must be one of column, row, or grid',
    })
    layoutType: string

    @ApiProperty({
        description: 'User ID of the creator',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty({ message: "UserId is required." })
    createdById: number
}
