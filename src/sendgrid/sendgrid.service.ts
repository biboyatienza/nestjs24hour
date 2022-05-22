import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as SendGrid from '@sendgrid/mail';
import { AppService } from 'src/app.service';
import { PasswordResetEvent } from 'src/auth/events';

@Injectable()
export class SendgridService {
  // I need sending email log:
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly configService: ConfigService){
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }

  
  @OnEvent('email.password.reset.token')
  async handleEmailPasswordResetToken(payload: PasswordResetEvent){
    const mail = {
      to: payload.email,
      subject: 'Elrlich 24hr - Password Reset Token',
      from: 'biboyatienza@gmail.com',
      text: 'Your Password Reset Token: ' + payload.passwordResetToken,
      html: '<h3>Your Password Reset Token:</h3> ' + payload.passwordResetToken
    };

    this.logger.log('Sending email, Password reset token', mail);
    return await this.send(mail);
  }
  
}
