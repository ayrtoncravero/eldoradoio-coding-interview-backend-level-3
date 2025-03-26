import { AppError } from './AppError';

export class ValidationError extends AppError {
  constructor(message: string = 'Invalid input data') {
    super(message, 400);
  }
};
