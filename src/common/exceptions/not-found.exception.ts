import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(public readonly message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}
