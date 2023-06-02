import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.createUser(body);
    res.status(auth.status).json(auth.content);
  }

  @Post('login')
  async login(@Req() req, @Res() res, @Body() body) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.slice(7);
    try {
      const result = await this.authService.logout(token);
      res.status(result.status).json(result.msg);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const user = await this.authService.getUserByEmail(body.email);

    if (!user) {
      return { status: 404, content: { msg: 'User not found' } };
    }

    const token = await this.authService.generateResetPasswordToken(user);
    console.log(token);

    await this.mailerService.sendResetPasswordEmail(user.email, token);

    return { status: 200, content: { msg: 'Reset password email sent' } };
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: { password: string },
  ) {
    const resetPasswordResult = await this.authService.resetPassword(
      token,
      body.password,
    );
    return {
      status: resetPasswordResult.status,
      content: resetPasswordResult.msg,
    };
  }
}
