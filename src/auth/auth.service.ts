import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from '../user/interface/user.interface';
import { LoginUserRequestDto } from './dto/login-user-request.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUserAuth } from 'src/user/interface/user-auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserRequestDto): Promise<IUser> {
    const user = this.userService.findOneByLoginUserDto(loginUserDto);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    return user;
  }

  async login(user: IUserAuth) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async logout() {
    // Simulate a user logout process
    return { message: 'User logged out successfully' };
  }
}
