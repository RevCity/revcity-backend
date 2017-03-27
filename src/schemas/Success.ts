import {Response} from './Response';

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
