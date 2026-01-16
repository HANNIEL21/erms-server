import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post("init")
  async initPayment(
    @Req() req,
    @Body()
    body: {
      request: string;
      type: string;
      destination: string;
      price: number;
      processing_fee: number;
      document: any;
      user?: any;
    }
  ) {
    // If user isn’t attached on body, attach from authenticated request
    const payload = {
      ...body,
      user: body.user || req.user,
    };

    return this.paymentService.initPayment(payload);
  }

  // 🔹 Update an existing payment
  @Patch(":id")
  async updatePayment(
    @Param("id") id: string,
    @Body()
    body: Partial<{
      transaction_id: string;
      reference: string;
      access_code: string;
      gateway_response: any;
      status: string;
      email: string;
    }>
  ) {
    return this.paymentService.updatePayment(id, body);
  }

  // 🔹 Fetch all payments (admin)
  @Get()
  getAllPayments(@Req() req) {
    return this.paymentService.findAll();
  }

  // 🔹 Fetch single payment by ID
  @Get(":id")
  getPaymentById(@Param("id") id: string) {
    return this.paymentService.findOne(id);
  }

  // 🔹 Fetch payments by user ID
  @Get("user/:userId")
  getPaymentsByUser(@Param("userId") userId: number) {
    return this.paymentService.findAllByUser(+userId);
  }

}
