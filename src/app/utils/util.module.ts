import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerUtil } from './mailer.util';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'siphalal@gmail.com',
                    pass: 'siphalal123'
                },
            }
        })
    ],
    providers: [MailerUtil],
    exports: [MailerUtil]
})

export class UtilModule {}