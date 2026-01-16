import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateDepartmentDto) {
    try {
      const faculty = await this.prisma.faculty.findUnique({ where: { id: dto.facultyId } });
      if (!faculty) {
        return {
          status: 203,
          message: `Faculty not found.`
        }
      }

      const existingDepartment = await this.prisma.department.findUnique({ where: { name: dto.name } });
      if (existingDepartment) {
        return {
          status: 200,
          message: `Department ${dto.name} already exists.`
        }
      }

      const department = await this.prisma.department.create({
        data: {
          ...dto
        },
        select: {
          id: true,
          name: true,
          createdAt: true
        }
      })

      return {
        status: 201,
        message: `Department ${dto.name} created.`,
        data: department
      }

    } catch (error) {
      return {
        status: 500,
        message: `An error occured : ${error}`
      }
    }
  }

  async findAll() {
    try {
      const departments = await this.prisma.department.findMany({
        select: {
          id: true,
          name: true,
          faculty: {
            select: {
              id: true,
              name: true
            }
          },
          createdBy: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true
            }
          },
          createdAt: true,
        }
      })

      return {
        status: 200,
        data: departments
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured : ${error}`
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
