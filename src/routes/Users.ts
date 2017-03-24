import {Router, Request, Response, NextFunction} from 'express';
import * as util from 'util';
import * as FB from 'fb';
import * as Google from 'googleapis';

class UsersRouter {

  router: Router;

  /** Constructor **/
  constructor() {
    this.router = Router();
    this.init();
  }

  /** Setup all endpoints **/
  init() {
    this.router.post('/fb', this.fbLogin);
    this.router.post('/google', this.googleLogin);
  }

  /** Facebook Login **/
  public fbLogin(req: Request, res: Response, next: NextFunction) {
    const fields = ['id', 'name', 'email', 'picture.type(large)'];
    const token = req.param("accessToken");
    FB.api('me', { fields: fields, access_token: token }, r => {
      res.json(r);
    });
  }

  /** Google Login **/
  public googleLogin(req: Request, res: Response, next:  NextFunction) {

    // OAuth2 client for the app
    let oauth2Client = new Google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET_KEY,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Grab the id_token from the request
    let token = req.param('idToken');

    // Set the credential via the OAuth client
    oauth2Client.setCredentials({
      access_token: token
    });

    // Grab the person
    Google.plus('v1').people.get({
      userId: 'me',
      auth: oauth2Client
    }, (err, resp) => {
      if (err) {
        res.json(err);
      } else {
        res.json(resp);
      }
    });
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.router;
