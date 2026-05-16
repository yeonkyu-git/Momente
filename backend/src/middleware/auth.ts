import { Request, Response, NextFunction } from 'express';
import supabase from '../lib/supabase.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      data: null,
      error: 'UNAUTHORIZED',
      message: '인증 토큰이 필요합니다',
    });
  }

  const token = authHeader.substring(7);

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        data: null,
        error: 'INVALID_TOKEN',
        message: '유효하지 않은 토큰입니다',
      });
    }

    req.user = {
      id: data.user.id,
      email: data.user.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      data: null,
      error: 'INVALID_TOKEN',
      message: '유효하지 않은 토큰입니다',
    });
  }
}
