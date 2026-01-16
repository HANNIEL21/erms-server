import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRequestDto {
    @ApiProperty({
        description: "ID of the user making the request",
        example: 12,
    })
    @IsNumber()
    @IsNotEmpty({ message: "User ID is required" })
    userId: number;

    @ApiProperty({
        description: "Email of the user making the request",
    })
    @IsString()
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @ApiProperty({
        description: "Request type (internal, external_local, external_foreign)",
        example: "internal",
    })
    @IsString()
    @IsNotEmpty({ message: "Request type is required" })
    type: string;

    @ApiProperty({
        description: "Destination (faculty ID or email)",
        example: "faculty_3 OR destination@email.com",
    })
    @IsString()
    @IsNotEmpty({ message: "Destination is required" })
    destination: string;

    @ApiProperty({
        description: "Payment or request reference number",
        example: "REQ-2026-0001",
    })
    @IsString()
    @IsNotEmpty({ message: "Reference number is required" })
    reference_number: string;

    @ApiProperty({
        description: "Requested document ID",
        example: 5,
    })
    @IsNumber()
    @IsNotEmpty({ message: "Document ID is required" })
    documentId: number;
}
