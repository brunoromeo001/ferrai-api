import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: ()=> ({
        secret: process.env.JWT_SECRET,
        singOptions: { expiresIn: `${process.env.JWT_EXPIRES}s` }
      }),
    }),
    PrismaModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
