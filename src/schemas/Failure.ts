import {Response} from './Response';

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
