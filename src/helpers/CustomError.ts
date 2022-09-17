export default class CustomError extends Error {
  status: number;
  error: string;

  constructor(status: number, error: string) {
    super();
    this.status = status;
    this.error = error;
  }
}