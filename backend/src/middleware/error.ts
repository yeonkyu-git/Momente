import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export function errorHandler(err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    console.error(err.message);
  }

  const statusCode = err.status ?? 500;
  const message = statusCode === 500 ? '서버 오류가 발생했습니다' : err.message || '요청을 처리할 수 없습니다';

  res.status(statusCode).json({
    data: null,
    error: err.name || 'INTERNAL_SERVER_ERROR',
    message,
  });
}
