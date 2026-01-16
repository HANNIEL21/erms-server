import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '..//prisma/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTemplateDto) {
    try {
      const existing = await this.prisma.template.findUnique({ where: { name: dto.name } });

      if (existing) {
        return {
          status: 200,
          message: `Template ${dto.name} already exist`
        }
      }

      const newTemplate = await this.prisma.template.create({
        data: {
          name: dto.name,
          description: dto.description,
          documentId: dto.documentId,
          createdById: dto.createdById,
          version: dto.version,
          isActive: dto.isActive,
        },
        select: {
          id: true,
          name: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          }
        }
      })

      return {
        status: 201,
        message: "Template created",
        data: newTemplate
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`,
      }
    }
  }

  async findAll() {
    try {
      const templates = await this.prisma.template.findMany({
        select: {
          id: true,
          name: true,
          version: true,
          versions: true,
          isActive: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          document: {
            select: {
              id: true,
              title: true
            }
          },
          createdAt: true
        }
      })

      return {
        status: 200,
        data: templates
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`,
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
}
