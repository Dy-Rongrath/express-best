export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
  constructor(status: number, message: string, code?: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export const NotFound = (msg = 'Resource not found') => new ApiError(404, msg, 'NOT_FOUND');
export const BadRequest = (msg = 'Bad request', details?: unknown) => new ApiError(400, msg, 'BAD_REQUEST', details);
export const Unauthorized = (msg = 'Unauthorized') => new ApiError(401, msg, 'UNAUTHORIZED');
export const Forbidden = (msg = 'Forbidden') => new ApiError(403, msg, 'FORBIDDEN');
