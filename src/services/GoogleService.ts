import * as Google from 'googleapis';
import * as Promise from 'bluebird';
import GoogleSignInResult from '../schemas/GoogleSignInResult';

export class GoogleService {

  private googleOAuth : any = new Google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_KEY,
    process.env.GOOGLE_REDIRECT_URI
  );

  /* For singleton pattern */
  private static _instance : GoogleService;

  /* Get Singleton Instance */
  public static getInstance() : GoogleService {
    return this._instance || (this._instance = new this());
  }

  /** Constructor **/
  private constructor() {
  }

  /** Response to Result **/
  private respToResult(r : any) : Promise<GoogleSignInResult> {
    return Promise.resolve({
      googleId: r.sub,
      email: r.email || '',
      givenName: r.given_name || '',
      familyName: r.family_name || '',
      picture: r.picture || ''
    });
  }

  /** Get Google User From Token **/
  public getUserFromToken(token: string) : Promise<GoogleSignInResult> {
    this.googleOAuth.setCredentials({ access_token: token });
    let getMe : any = Promise.promisify(Google.plus('v1').people.get);
    return getMe({ userId: 'me', auth: this.googleOAuth })
      .then(data => {
        return this.respToResult(data);
      }).catch(err => {
        return err;
      });
  }

}

export default GoogleService;
