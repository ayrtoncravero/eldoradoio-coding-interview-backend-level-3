import { AppError } from './AppError';

export class DatabaseError extends AppError {
	constructor(message = 'Database operation failed') {
	  super(message, 500);
	}
};
  