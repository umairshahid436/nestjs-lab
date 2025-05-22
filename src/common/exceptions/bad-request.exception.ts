import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(public readonly message: string) {
    super(message, 'BAD_REQUEST', 400);
  }
}
