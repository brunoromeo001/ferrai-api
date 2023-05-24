import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServicesModule } from './services/services.module';
import { ContactModule } from './contact/contact/contact.module';

@Module({
  imports: [
    MailModule,
    AuthModule,
    UserModule,
    PrismaModule,
    ServicesModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [ServicesModule],
})
export class AppModule { }
