import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaystackService } from '../paystack/paystack.service';
import { PaystackModule } from '../paystack/paystack.module';

@Module({
  imports:[PaystackModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule { }
