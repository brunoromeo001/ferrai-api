import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        MailModule,
        PrismaModule,
        UserModule,
        JwtModule.registerAsync({
            useFactory: () =>({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number(process.env.JWT_EXPIRE)
                }
            })
        })
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,

    ],
})
export class AuthModule { }
