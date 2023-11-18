import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
@Injectable()
export class EmailService {
  transporter: Transporter;
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('NODEMAILER_SERVER_HOST'),
      port: this.configService.get('NODEMAILER_SERVER_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('NODEMAILER_SERVER_AUTH_EMAIL'),
        pass: this.configService.get('NODEMAILER_SERVER_AUTH_PRIVATE_KEY'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: this.configService.get('NODEMAILER_SERVER_AUTH_EMAIL'),
      },
      to,
      subject,
      html,
    });
  }
}
