import {Router, Request, Response, NextFunction} from 'express';
import * as util from 'util';
import * as passport from 'passport';
import {Constants} from '../utils/Constants';

export class UsersRouter {

  router: Router;

  /** Constructor **/
  constructor() {
    this.router = Router();
    this.init();
  }

  /** Setup all endpoints **/
  init() {

    this.router.post(
      '/fb',
      passport.authenticate(Constants.FB_SIGN_IN_STRATEGY),
      this.fbLogin
    );

    this.router.post(
      '/google',
      passport.authenticate(Constants.GOOGLE_SIGN_IN_STRATEGY),
      this.googleLogin
    );

  }

  /** Facebook Login **/
  public fbLogin(req: Request, res: Response, next: NextFunction) {
    res.json(req.user);
  }

  /** Google Login **/
  public googleLogin(req: Request, res: Response, next: NextFunction) {
    res.json(req.user);
  }

  /** Local Login (Http Digest) **/
  public localLogin(req: Request, res: Response, next: NextFunction) {
    // TODO
    res.json({});
  }

}
