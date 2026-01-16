import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) { }

  async create(paymentId: string, dto: CreateRequestDto) {
    try {
      const payment = await this.prisma.payment.findUnique({ where: { id: paymentId } });

      if (!payment) {
        return {
          status: 400,
          message: `Payment ${paymentId} not found`
        }
      }

      if (payment.status !== "SUCCESSFUL") {
        return {
          status: 400,
          message: `Payment was not successful`
        }
      }

      const request = await this.prisma.request.create({
        data: {
          userId: dto.userId,
          documentId: dto.documentId,
          type: dto.type,
          destination: dto.destination,
          email: dto.email
        },
        select: {
          id: true,
          destination: true,
          email: true,
          user: {
            select: {
              id: true,
            }
          },
          document: {
            select: {
              id: true
            }
          }
        }
      })

      const updatedPayment = await this.prisma.payment.update({
        where: { id: paymentId },
        data: { requestId: request.id },
      });

      return {
        status: 201,
        message: "Request created and payment linked successfully",
        data: request,
        payment: updatedPayment
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
      const requests = await this.prisma.request.findMany({
        select: {
          id: true,
          status: true,
          reference_number: true,
          user: {
            select: {
              id: true,
              matric_number: true,
              email: true
            }
          },
          document: {
            select: {
              id: true,
              title: true,
              totalAmount: true,
            }
          },
          payments: {
            select: {
              id: true,
              status: true,
              reference: true
            }
          },
          createdAt: true
        }
      })

      return {
        status: 200,
        data: requests
      }
    } catch (error) {
      return {
        stattus: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async findAllByUser(userId: number) {
    try {
      const userRequests = await this.prisma.request.findMany({
        where: { userId: userId },
        select: {
          id: true,
          status: true,
          reference_number: true,
          type: true,
          document: {
            select: {
              id: true,
              title: true,
              totalAmount: true
            }
          },
          payments: {
            select: {
              id: true,
              status: true,
              reference: true
            }
          },
          createdAt: true
        }
      })

      return {
        status: 200,
        data: userRequests
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
