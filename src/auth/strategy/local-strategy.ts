import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUserAuth } from 'src/user/interface/user-auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<IUserAuth> {
    const user = await this.authService.validateUser({
      username: username,
      password: password,
    });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return { username: user.username, id: user.id };
  }
}
