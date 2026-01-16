import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateRoleDto) {
    try {
      const existingRole = await this.prisma.role.findUnique({ where: { name: dto.name } });

      if (!existingRole) {
        const newRole = await this.prisma.role.create({
          data: {
            ...dto
          },
          select: {
            id: true,
            name: true,
            users: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true
              }
            }
          }
        });

        return {
          status: 201,
          message: `Role ${dto.name} Created.`,
          data: newRole
        }
      } else {
        return {
          status: 200,
          message: `Role ${dto.name} Already Exists.`
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async findAll() {
    try {
      const roles = await this.prisma.role.findMany({
        select: {
          id: true,
          name: true,
          _count: { select: { users: true } },
          createdAt: true
        }
      })

      return {
        status: 200,
        data: roles
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          users: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      });

      if (!role) {
        return {
          status: 200,
          message: `Role with ID ${id} not found.`
        }
      }

      return {
        status: 200,
        data: role
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
