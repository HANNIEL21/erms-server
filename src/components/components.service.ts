import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AddBlocksDto } from './dto/add-block.dto';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateComponentDto) {
    try {
      const component = await this.prisma.component.create({
        data: {
          name: dto.name,
          description: dto.description,
          layoutType: dto.layoutType,
          createdById: dto.createdById
        },
        select: {
          id: true,
          name: true,
          layoutType: true,
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
        message: ` ${dto.name} Component created.`,
        data: component
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
      const components = await this.prisma.component.findMany({
        select: {
          id: true,
          name: true,
          layoutType: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          _count: {
            select: {
              blocks: true
            }
          },
          blocks: {
            select: {
              id: true,
              position: true,
              block: {
                select: {
                  id: true,
                  name: true,
                  blockType: true,
                  defaultValue: true,
                  isDynamic: true
                }
              }
            }
          },
          createdAt: true,
          updatedAt: true
        }
      })

      return {
        status: 200,
        data: components
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error cooured ${error}`
      }
    }
  }

  async addBlocks(componentId: number, dto: AddBlocksDto) {
    try {
      const component = await this.prisma.component.findUnique({ where: { id: componentId } });
      if (!component) {
        return {
          status: 404,
          message: `Component ${componentId} not found.`
        }
      }

      const blocks = await this.prisma.$transaction(
        dto.blocks.map((item) =>
          this.prisma.componentBlock.create({
            data: {
              componentId,
              blockId: item.blockId,
              position: item.position,
            },
          }),
        ),
      )

      return {
        status: 201,
        message: 'Blocks added successfully',
        data: blocks
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`,
      }
    }
  }

  async findOne(id: number) {
    try {
      const component = await this.prisma.component.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          layoutType: true,
          blocks: {
            select: {
              id: true,
              position: true,
              block: {
                select: {
                  id: true,
                  name: true,
                  blockType: true,
                  defaultValue: true,
                  isDynamic: true
                }
              }
            }
          }
        }
      })

      return {
        status: 200,
        data: component
      }

    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  update(id: number, updateComponentDto: UpdateComponentDto) {
    return `This action updates a #${id} component`;
  }

  remove(id: number) {
    return `This action removes a #${id} component`;
  }
}
