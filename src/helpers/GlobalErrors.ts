import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';

const globalError = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const error = err.error || 'Something went wrong';
  return res.status(status).json({ error });
};

export default globalError;