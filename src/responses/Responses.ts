abstract class Response {
  success: boolean;
}

export class Success extends Response {
  success = true;
  data = {}

  constructor(key: string, value: any) {
    super();
    this.data[key] = value
  }

  add(key: string, value: any) : Success {
    this.data[key] = value;
    return this;
  }
}

export class Failure extends Response {
  success = false;
  errors = []

  constructor(error: string) {
    super();
    this.errors.push(error);
  }

  add(error: string) : Failure {
    this.errors.push(error);
    return this;
  }
}
