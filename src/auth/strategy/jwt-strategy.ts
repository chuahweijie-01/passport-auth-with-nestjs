import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'YOUSHOULDCREATEAPRIVATESECRETKEY',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
