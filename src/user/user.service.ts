import { Injectable } from '@nestjs/common';
import { LoginUserRequestDto } from 'src/auth/dto/login-user-request.dto';
import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class UserService {
  users: IUser[] = [
    {
      id: '1',
      username: 'testuser',
      password: 'password123',
    },
  ];

  async findOneByLoginUserDto({
    username,
    password,
  }: LoginUserRequestDto): Promise<IUser | null> {
    return (
      this.users.find(
        (user) => user.username === username && user.password === password,
      ) || null
    );
  }
}
