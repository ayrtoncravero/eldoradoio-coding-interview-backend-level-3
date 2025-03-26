import { AppError } from './AppError';

export class InternalError extends AppError {
  constructor(message: string = 'Internal error') {
    super(message, 500);
  }
};
