import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateDocumentDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.createdById },
        select: {
          id: true
        }
      })

      if (!user) {
        return {
          status: 404,
          message: `User ${dto.createdById} not found.`
        }
      }

      const existing = await this.prisma.document.findUnique({
        where: { title: dto.title },
        select: {
          id: true
        }
      })

      if (existing) {
        return {
          status: 200,
          message: `Document ${dto.title} already exist.`
        }
      }

      const document = await this.prisma.document.create({
        data: {
          title: dto.title,
          status: dto.status,
          price: Number(dto.price),
          processingFee: Number(dto.processingFee),
          totalAmount: Number(dto.totalAmount),
          description: dto.description,
          createdById: dto.createdById
        },
        select: {
          id: true,
          title: true,
          status: true,
          totalAmount: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          createdAt: true,
        }
      })

      return {
        status: 201,
        data: document
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
      const documents = await this.prisma.document.findMany({
        select: {
          id: true,
          title: true,
          status: true,
          description: true,
          totalAmount: true,
          createdBy: {
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
      return {
        status: 200,
        data: documents
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
      const existingDoc = await this.prisma.document.findUnique({
        where: { id: id },
        select: {
          id: true,
          title: true,
          status: true,
          description: true,
          totalAmount: true,
          createdBy: {
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

      if (!existingDoc) {
        return {
          status: 200,
          message: `Document With ID ${id} Not Found.`
        }
      }

      return {
        status: 200,
        data: existingDoc
      }

    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async update(id: number, dto: UpdateDocumentDto) {
    try {
      const existing = await this.prisma.document.findUnique({ where: { id } });
      if (!existing) {
        return {
          status: 404,
          message: `Document ${id} not found`
        }
      }

      const update = await this.prisma.document.update({
        where: { id },
        data: {
          ...dto,
          price: Number(dto.price),
          processingFee: Number(dto.processingFee || 0),
          totalAmount: Number(dto.price) + Number(dto.processingFee || 0),
        },
      })

      return {
        status: 200,
        data: update
      }
    } catch (error) {

    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.document.findUnique({ where: { id } });
      if (!existing) {
        return {
          status: 404,
          message: `Document ${id} not found`
        }
      }

      await this.prisma.document.delete({ where: { id } });
      return {
        status: 200,
        message: `Document ${id} deleted.`
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }
}
