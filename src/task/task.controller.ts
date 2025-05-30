import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';

@Controller('task')
export class TaskController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks() {
    return {
      task: 'Welcome to the secret api! You should only see this when logged in succesfully.',
    };
  }
}
