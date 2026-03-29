import { Request } from 'express';
import { UsersModel } from '../../users/entities/users.entity';

export type TokenType = 'access' | 'refresh';

export interface TokenPayload {
  email: string;
  sub: number;
  type: TokenType;
}

export interface AuthenticatedRequest extends Request {
  user?: UsersModel;
  token?: string;
  tokenType?: TokenType;
}
