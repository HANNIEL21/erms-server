import { Injectable } from '@nestjs/common';
import { CreateAlumnusDto } from './dto/create-alumnus.dto';
import { UpdateAlumnusDto } from './dto/update-alumnus.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlumniService {
  constructor(private readonly prisma: PrismaService) { }

  create(createAlumnusDto: CreateAlumnusDto) {
    return 'This action adds a new alumnus';
  }

  async findAll() {
    try {
      const alumniData = await this.prisma.alumni.findMany({
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
          phone_number: true, 
          matric_number: true,
          _count: {
            select: {
              requests: true, 
            },
          },
          last_login: true,
          data: true,
          createdAt: true
        }
      })

      return {
        status: 200,
        data: alumniData
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} alumnus`;
  }

  update(id: number, updateAlumnusDto: UpdateAlumnusDto) {
    return `This action updates a #${id} alumnus`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumnus`;
  }
}
