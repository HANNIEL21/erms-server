import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlockService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateBlockDto) {
    try {
      const block = await this.prisma.block.create({
        data: {
          name: dto.name,
          blockType: dto.blockType,
          defaultValue: dto.defaultValue,
          isDynamic: dto.isDynamic,
          createdById: dto.createdById
        },
        select: {
          id: true,
          name: true,
          blockType: true,
          isDynamic: true,
          defaultValue: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          createdAt: true
        }
      })

      return {
        status: 201,
        message: `${dto.blockType} Block created.`,
        data: block
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
      const blocks = await this.prisma.block.findMany({
        select: {
          id: true,
          name: true,
          isDynamic: true,
          blockType: true,
          defaultValue: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      })

      return {
        status: 200,
        data: blocks
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  async update(id: number, dto: UpdateBlockDto) {
    try {
      const existing = await this.prisma.block.findUnique({
        where: { id },
      });

      if (!existing) {
        return {
          status: 404,
          message: `Block ${id} not found.`,
        };
      }

      const updatedBlock = await this.prisma.block.update({
        where: { id },
        data: {
          name: dto.name ?? existing.name,
          defaultValue: dto.defaultValue ?? existing.defaultValue,
          isDynamic: dto.isDynamic ?? existing.isDynamic,
          blockType: dto.blockType ?? existing.blockType,
        },
      });

      return {
        status: 200,
        message: 'Block updated successfully',
        data: updatedBlock,
      };
    } catch (error) {
      console.error('Update block error:', error);

      return {
        status: 500,
        message: 'Failed to update block',
      };
    }
  }


  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
