import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserResponseDto } from './dto/login-user-response.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guard/local-guard';
import { IUserAuth } from 'src/user/interface/user-auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginUserResponseDto> {
    const token = await this.authService.login(req.user as IUserAuth);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`;
    res.setHeader('Set-Cookie', cookie);
    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginUserResponseDto> {
    const cookie = `Authentication=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`;
    res.setHeader('Set-Cookie', cookie);
    return { message: 'Logged out successfully' };
  }
}
