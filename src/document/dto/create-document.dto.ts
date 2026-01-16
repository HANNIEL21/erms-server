import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
    @ApiProperty({ description: "Dcoument Title" })
    @IsString()
    @IsNotEmpty({ message: "Title Is required" })
    title: string

    @ApiProperty({ description: "Optional document description" })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ description: "Document status (DRAFT, ACTIVE, INACTIVE)" })
    @IsString()
    @IsNotEmpty({ message: "Status is required" })
    status: string

    @ApiProperty({ description: "Document price" })
    @IsNumber()
    @IsNotEmpty({ message: "Price is required" })
    @Transform(({ value }) => parseFloat(value))
    price: number

    @ApiProperty({ description: "Document Processing Fee" })
    @IsNumber()
    @IsNotEmpty({ message: "Processing fee is required" })
    @Transform(({ value }) => parseFloat(value))
    processingFee: number

    @ApiProperty({ description: "Document Total Amoount" })
    @IsNumber()
    @IsNotEmpty({ message: "Total Amoount is required" })
    @Transform(({ value }) => parseFloat(value))
    totalAmount: number

    @ApiProperty({
        description: 'ID of the user creating this document',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty({ message: 'Created by user ID is required' })
    @Transform(({ value }) => parseInt(value))
    createdById: number;
}
