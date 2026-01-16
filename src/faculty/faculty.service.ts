import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacultyService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateFacultyDto) {
    try {
      const existingFaculty = await this.prisma.faculty.findUnique({ where: { name: dto.name } });

      if (existingFaculty) {
        return {
          status: 200,
          message: `Faculty ${dto.name} already exists.`
        }
      }

      const faculty = await this.prisma.faculty.create({
        data: {
          ...dto
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              departments: true
            }
          }
        }
      })

      return {
        status: 201,
        message: `Faculty ${dto.name} created.`,
        data: faculty
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured: ${error}`
      }
    }
  }

  async findAll() {
    try {
      const faculties = await this.prisma.faculty.findMany({
        select: {
          id: true,
          name: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          _count: {
            select: {
              departments: true,
            }
          },
          createdAt: true
        }
      })

      return {
        status: 200,
        data: faculties
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured: ${error}`
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} faculty`;
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }
}
