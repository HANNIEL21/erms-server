import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {

    @ApiProperty({
        description: "Department Name"
    })
    @IsString()
    @IsNotEmpty({ message: "Name is required." })
    name: string

    @ApiProperty({
        description: "Faculty ID"
    })
    @IsNumber()
    @IsNotEmpty({ message: "Faculty ID is required." })
    facultyId: number

    @ApiProperty({
        description: "Created By"
    })
    @IsNumber()
    @IsNotEmpty({ message: "Admin ID is required." })
    createdById: number
}
