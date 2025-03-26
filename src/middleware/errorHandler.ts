import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError'; // Asegúrate de importar la versión correcta

const errorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error("Error capturado en errorHandler:", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

export { errorHandler };
