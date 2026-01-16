import { Injectable } from '@nestjs/common';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComboService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateComboDto) {
    try {
      const existing = await this.prisma.combo.findUnique({ where: { matric_number: dto.matric_number } });

      if (existing) {
        return {
          status: 200,
          message: `Combo for ${dto.matric_number} already exist.`
        }
      }

      const combo = await this.prisma.combo.create({
        data: {
          ...dto
        },
        select: {
          id: true,
          matric_number: true,
          isPrinted: true
        }
      })

      return {
        status: 201,
        data: combo,
        message: "Combo created."
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
      const combos = await this.prisma.combo.findMany({
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
          isPrinted: true,
          matric_number: true,
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
        status: 200,
        data: combos
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async updatePrintStatus(matric: string, isPrinted: boolean) {
    try {
      if (!matric || typeof isPrinted !== 'boolean') {
        return {
          status: 400,
          message: 'Matric number and print status are required',
        };
      }

      const combo = await this.prisma.combo.findUnique({
        where: { matric_number: matric },
        select: {
          id: true,
          isPrinted: true,
        },
      });

      if (!combo) {
        return {
          status: 404,
          message: `Combo for user ${matric} not found.`,
        };
      }

      // Prevent unnecessary update
      if (combo.isPrinted === isPrinted) {
        return {
          status: 409,
          message: `Certificate is already marked as ${isPrinted ? 'printed' : 'pending'
            }`,
        };
      }

      const updated = await this.prisma.combo.update({
        where: { matric_number: matric },
        data: {
          isPrinted,
        },
        select: {
          id: true,
          isPrinted: true,
          updatedAt: true,
        },
      });

      return {
        status: 200,
        message: `Print status updated to ${isPrinted ? 'printed' : 'pending'
          } successfully`,
        data: updated,
      };
    } catch (error) {
      return {
        status: 500,
        message: `An error occurred: ${error.message}`,
      };
    }
  }


  async checkPrintStatus(matric: string) {
    try {
      const existing = await this.prisma.combo.findUnique({ where: { matric_number: matric } });
      if (!existing) {
        return {
          status: 404,
          message: `Combo for user ${matric} not found.`
        }
      }

      const combo = await this.prisma.combo.findUnique({
        where: { matric_number: matric },
        select: {
          id: true,
          isPrinted: true,
          createdAt: true
        }
      })

      return {
        status: 200,
        data: combo
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
      const combo = await this.prisma.combo.findUnique({
        where: { id },
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
          isPrinted: true,
          matric_number: true,
          createdBy: {
            select: {
              id: true,
              email: true
            }
          },
          createdAt: true
        }
      });
      if (!combo) {
        return {
          status: 404,
          message: `Combo ${id} not found.`
        }
      }

      return {
        status: 200,
        data: combo
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  async update(id: number, dto: UpdateComboDto) {
    try {
      let existing = await this.prisma.combo.findUnique({ where: { id } });
      if (!existing) {
        return {
          status: 404,
          message: `Combo ${id} not found.`
        }
      }

      const combo = await this.prisma.combo.update({
        where: { id: id },
        data: {
          ...dto
        },
        select: {
          id: true,
          firstname: true,
          middlename: true,
          lastname: true,
          email: true,
          isPrinted: true,
          matric_number: true,
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
        status: 200,
        data: combo
      }
    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }

  remove(id: number) {
    try {

    } catch (error) {
      return {
        status: 500,
        message: `An error occured ${error}`
      }
    }
  }
}
