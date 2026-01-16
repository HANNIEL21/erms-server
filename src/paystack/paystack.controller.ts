import { Controller, Body, All, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PaystackService } from './paystack.service';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) { }

  @All("webhook")
  async handleWebHook(
    @Body() payload: any,
    @Headers("x-paystack-signature") signature: string
  ) {
    const isValid = this.paystackService.verifyWebhook(signature, payload);
    if (!isValid) {
      throw new HttpException("Invalid signature", HttpStatus.UNAUTHORIZED);
    }
    return this.paystackService.handleWebhook(payload);
  }
}
