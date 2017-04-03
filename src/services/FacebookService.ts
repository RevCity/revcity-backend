import * as Fb from 'fb';
import * as EventSearch from 'facebook-events-by-location-core';
import * as Promise from 'bluebird';
import {FacebookSignInResult} from '../schemas/FacebookSignInResult';

export class FacebookService {

  /* For singleton pattern */
  private static _instance : FacebookService;

  /* Get singleton instance */
  public static getInstance() : FacebookService {
    return this._instance || (this._instance = new this());
  }

  /** Constructor **/
  private constructor() {
    // Setup FB
    Fb.options({
      appId:     process.env.FB_APP_ID,
      appSecret: process.env.FB_APP_SECRET
    });
  }

  /** Parse login **/
  private parseLogin(r : any) : Promise<FacebookSignInResult> {
    return Promise.resolve({
      facebookId: r.id,
      name:       r.name || '',
      email:      r.email || '',
      picture:    r.picture.data.url || ''
    });
  }

  /** Get FB application access token **/
  public getAccessToken() : Promise<string> {
    return new Promise((resolve, reject) => {
      Fb.api('oauth/access_token', {
        client_id: process.env.FB_APP_ID,
        client_secret: process.env.FB_APP_SECRET,
        grant_type: 'client_credentials'
      }, (res) => {
        if (!res || res.error) {
          reject(!res ? 'A FB authentication error occurred' : res.error);
        }
        resolve(res.access_token);
      });
    }) as Promise<string>;
  }

  /** Get FB user from token **/
  public getUserFromToken(token: string) : Promise<FacebookSignInResult> {
    const fields = ['id', 'name', 'email', 'picture.type(large)'];
    let getMe : Promise<any> = new Promise((resolve, reject) => {
      Fb.api('me', {
        fields: fields,
        access_token: token
      }, (data) => {
        if (!data || data.error) {
          reject(data);
        }
        resolve(data);
      });
    });
    return getMe.then(this.parseLogin);
  }

  /** Search events based on request `request` **/
  public searchEvents(request : any) : Promise<any> {
    return this.getAccessToken()
      .then(token => {
        return new EventSearch({ accessToken: token, ...request }).search()
      })
  }

}
