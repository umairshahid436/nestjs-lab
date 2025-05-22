export abstract class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly status: number,
  ) {
    super(message);
  }
}
