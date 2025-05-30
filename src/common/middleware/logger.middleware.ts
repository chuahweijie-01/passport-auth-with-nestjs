import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl } = req;
    const date = new Date().toISOString();
    console.log(`[${date}] ${method} ${baseUrl}`);
    next();
  }
}
