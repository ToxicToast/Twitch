export class BaseException extends Error {
  constructor(readonly response: string, readonly status: number) {
    super(`[${status}] ${response}`);
  }
}
