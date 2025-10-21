import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter | null = null;
  private readonly logger = new Logger(EmailService.name);
  private emailEnabled = false;

  constructor(private configService: ConfigService) {
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPass = this.configService.get<string>('SMTP_PASS');

    if (smtpUser && smtpPass) {
      try {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
        this.emailEnabled = true;
        this.logger.log('Email service initialized successfully');
      } catch (error) {
        this.logger.warn('Failed to initialize email service:', error);
        this.emailEnabled = false;
      }
    } else {
      this.logger.warn('SMTP credentials not configured. Email service disabled.');
      this.emailEnabled = false;
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

    // If email is not enabled, just log the reset link
    if (!this.emailEnabled || !this.transporter) {
      this.logger.warn(`Email service not configured. Reset link for ${to}:`);
      this.logger.warn(`Reset link: ${resetLink}`);
      return;
    }

    const mailOptions = {
      from: this.configService.get<string>('SMTP_FROM', 'PathFinder <noreply@pathfinder.com>'),
      to,
      subject: 'Redefinição de Senha - PathFinder',
      html: this.getPasswordResetTemplate(resetLink),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Password reset email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${to}`, error);
      this.logger.warn(`Reset link (fallback): ${resetLink}`);
      throw error;
    }
  }

  /**
   * Password reset email HTML template
   */
  private getPasswordResetTemplate(resetLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redefinição de Senha</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">PathFinder</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #667eea; margin-top: 0;">Redefinição de Senha</h2>

          <p>Olá,</p>

          <p>Você solicitou a redefinição de senha da sua conta PathFinder. Clique no botão abaixo para criar uma nova senha:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}"
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                      padding: 14px 30px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;
                      font-weight: bold;">
              Redefinir Senha
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Se você não conseguir clicar no botão, copie e cole o link abaixo no seu navegador:
          </p>

          <p style="background: white; padding: 15px; border-radius: 5px; word-break: break-all; font-size: 12px;">
            ${resetLink}
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
              <strong>⚠️ Importante:</strong>
            </p>
            <ul style="color: #999; font-size: 12px; margin: 10px 0;">
              <li>Este link expira em 1 hora</li>
              <li>Se você não solicitou esta redefinição, ignore este email</li>
              <li>Sua senha atual permanecerá inalterada até que você crie uma nova</li>
            </ul>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2025 PathFinder. Todos os direitos reservados.</p>
          <p>Esta é uma mensagem automática, por favor não responda.</p>
        </div>
      </body>
      </html>
    `;
  }
}
