import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

export const mailOptions = (to: string, url: string) => {
    return {
        from: 'siphalal@gmail.com',
        to: to,
        subject: 'Reset Password',
        text: 'Reset Password',
        html: `   <center> 
        <h1>Reset Password</h1>
        <p>Click this link to reset your password</p>
        <button 
          style=
          "
            border: none;
            transition-duration: 0.4s;
            cursor: pointer;
            background-color: #76b5c3;
            border-radius: 12px;
          "
          type="button"
        > 
          <a 
          style=
          "
          text-decoration: none;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;color: white;
          padding: 16px 32px;
          transition-duration: 0.4s;" 
          href='${url}' target="_blank" rel="reset">Reset Password</a>
        </button>
      <center>
              `
    }
}

@Injectable()
export class MailerUtil {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    async sendResetPasswordEmail(email: string, token: string) {
        const url = `http://localhost:3000/auth/reset-password/?email=${email}&token=${token}`;
        const mail = mailOptions(email, url);
        await this.mailerService.sendMail(mail);
    }
}