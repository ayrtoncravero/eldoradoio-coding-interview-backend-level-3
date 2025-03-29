export class BadRequestError extends Error {
  statusCode: number;
  errors: any;

  constructor(message: string, errors?: any) {
    super(message);
    this.statusCode = 400;
    this.errors = errors || [];
  }
}
