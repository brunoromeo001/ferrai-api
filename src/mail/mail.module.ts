import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";


@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => ({
                transport:{
                    host: process.env.MAIL_HOST,
                    port: Number(process.env.MAIL_PORT),
                    secure: false,
                    auth:{
                        user: process.env.MAILER_USER,
                        pass: process.env.MAILER_PASS
                    }
                },
                defaults: {
                    from: `Hcode Lab <${process.env.MAIL_FROM}>`
                },
                template: {
                    dir: resolve(__dirname, 'templates'),
                    adapter: new PugAdapter(),
                    options: {
                        strict: true,
                    }
                }
            })
        })
    ],
    controllers: [],
    providers: [
        MailService,],
    exports: [MailService]
})
export class MailModule { }
