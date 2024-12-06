class ResponseError extends Error {
  public statusCode: number;
  public status: string;

  constructor(statusCode: number, status: string, message: string) {
    super(message); // Error message
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode; // HTTP status code
    this.status = status; // fail or success
  }
}

export { ResponseError };
