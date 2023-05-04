import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '3f5286ec77a3af',
        pass: '752d8f72f59c70',
      },
    });
  }

  async sendResetPasswordEmail(to: string, token: string) {
    const subject = 'Password Reset';
    const text = `Click the link below to reset your password:\n\nhttp://localhost:3000/auth/reset-password?token=${token}`;
    const html = `<p>Click the link below to reset your password:</p><p><a href="http://localhost:3000/auth/reset-password?token=${token}">Reset Password</a></p>`;

    await this.transporter.sendMail({
      from: 'your_email@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  }
}
