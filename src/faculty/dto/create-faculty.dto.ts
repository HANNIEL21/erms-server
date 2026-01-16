import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFacultyDto {

    @ApiProperty({
        description: "Faculty Name"
    })
    @IsString()
    @IsNotEmpty({ message: "Faculty Name is required" })
    name: string
    
    @ApiProperty({
        description: "Created By"
    })
    @IsNumber()
    @IsNotEmpty({ message: "Admin ID is required." })
    createdById: number
}
