import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class AddBlockItemDto {
    @ApiProperty({ description: 'Block Id' })
    @IsNumber()
    @IsNotEmpty()
    blockId: number

    @ApiProperty({ description: 'Block position in component' })
    @IsNumber()
    @IsNotEmpty()
    position: number
}

export class AddBlocksDto {
    @ApiProperty({ type: [AddBlockItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddBlockItemDto)
    blocks: AddBlockItemDto[]
}