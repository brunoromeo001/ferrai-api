import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [
        PrismaModule,
    ],
    controllers: [
        UserController,],
    providers: [
        UserService,
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
