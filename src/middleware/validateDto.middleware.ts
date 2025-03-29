import {
	Request,
	Response,
	NextFunction,
} from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function validateDto(dtoClass: any) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoInstance = plainToInstance(dtoClass, req.body);

		const errors = await validate(dtoInstance);

		if (errors.length > 0) {
			const errorMessages = errors.map(error => ({
				field: error.property,
				constraints: error.constraints,
			}));

			return res.status(400).json({
				message: 'validation failed',
				errors: errorMessages,
			});
		}

		next();
	};
}
