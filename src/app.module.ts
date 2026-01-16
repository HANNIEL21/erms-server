import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModule } from './document/document.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RsuApiModule } from './rsu-api/rsu-api.module';
import { PaymentModule } from './payment/payment.module';
import { PaystackModule } from './paystack/paystack.module';
import { FacultyModule } from './faculty/faculty.module';
import { DepartmentModule } from './department/department.module';
import { RequestModule } from './request/request.module';
import { AlumniModule } from './alumni/alumni.module';
import { TemplateModule } from './template/template.module';
import { ComponentsModule } from './components/components.module';
import { BlockModule } from './block/block.module';
import { ComboModule } from './combo/combo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    DocumentModule,
    RoleModule,
    AuthModule,
    RsuApiModule,
    PaymentModule,
    PaystackModule,
    FacultyModule,
    DepartmentModule,
    RequestModule,
    AlumniModule,
    TemplateModule,
    ComponentsModule,
    BlockModule,
    ComboModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
