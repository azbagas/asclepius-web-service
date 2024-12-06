import { ResponseError } from '../error/response-error';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    res
      .status(error.statusCode)
      .json({
        status: error.status,
        message: error.message,
      })
      .end();
  } else {
    console.log(error);
    res
      .status(500)
      .json({
        status: error.status || 'fail',
        message: error.message,
      })
      .end();
  }
};
