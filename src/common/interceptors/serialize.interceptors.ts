import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // exclude the properties that are not in the Dto
        });
      }),
    );
  }
}
