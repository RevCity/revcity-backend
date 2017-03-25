import * as FB from 'fb';
import * as Promise from 'bluebird';
import FacebookSignInResult from '../schemas/FacebookSignInResult';

export class FacebookService {

  /* For singleton pattern */
  private static _instance : FacebookService;

  /* Get Singleton Instance */
  public static getInstance() : FacebookService {
    return this._instance || (this._instance = new this());
  }

  /** Constructor **/
  private constructor() {
    // Setup FB
    FB.options({
      appId:     process.env.FB_APP_ID,
      appSecret: process.env.FB_APP_SECRET
    });
  }

  /** Response to Result **/
  private respToResult(r : any) : Promise<FacebookSignInResult> {
    return Promise.resolve({
      facebookId: r.id,
      name:       r.name || '',
      email:      r.email || '',
      picture:    r.picture.data.url || ''
    });
  }

  /** Get FB User From Token **/
  public getUserFromToken(token: string) : Promise<FacebookSignInResult> {
    const fields = ['id', 'name', 'email', 'picture.type(large)'];
    let getMe : Promise<any> = new Promise((resolve, reject) => {
      FB.api('me', { fields: fields, access_token: token}, (data) => {
        resolve(data);
      });
    });
    return getMe.then(this.respToResult);
  }

  // TODO - other fb operations

}

export default FacebookService;
