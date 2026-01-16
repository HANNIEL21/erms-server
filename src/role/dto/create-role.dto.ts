import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({
        description: 'Role Name'
    })
    @IsString()
    @IsNotEmpty({ message: "Name Is required" })
    name: string;
}
