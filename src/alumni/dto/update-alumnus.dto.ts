import { PartialType } from '@nestjs/swagger';
import { CreateAlumnusDto } from './create-alumnus.dto';

export class UpdateAlumnusDto extends PartialType(CreateAlumnusDto) {}
