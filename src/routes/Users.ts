import {Router, Request, Response, NextFunction} from 'express';
import * as util from 'util';
import * as passport from 'passport';
import {Constants} from '../utils/Constants';
import {Success} from '../schemas/Success';

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
  public fbLogin(req: any, res: Response, next: NextFunction) {
    let result =
      new Success(Constants.USER, req.user)
      .add(Constants.NEW_USER, req.newUser)
    res.json(result);
  }

  /** Google Login **/
  public googleLogin(req: any, res: Response, next: NextFunction) {
    let result =
      new Success(Constants.USER, req.user)
      .add(Constants.NEW_USER, req.user);
    res.json(result);
  }

  /** Local Login (Http Digest) **/
  public localLogin(req: Request, res: Response, next: NextFunction) {
    // TODO
    res.json({});
  }

}
