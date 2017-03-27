import * as util from 'util';
import * as passport from 'passport';
import {Router, Request, Response, NextFunction} from 'express';
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
      this.fbSignIn
    );

    this.router.post(
      '/google',
      passport.authenticate(Constants.GOOGLE_SIGN_IN_STRATEGY),
      this.googleSignIn
    );

    this.router.post(
      '/local/new',
      this.localSignUp
    )

    this.router.post(
      '/local',
      passport.authenticate(Constants.LOCAL_SIGN_IN_STRATEGY),
      this.localSignIn
    )

  }

  /** Facebook Sign In (req is `any` b/c newUser info attached in passport) **/
  public fbSignIn(req: any, res: Response, next: NextFunction) {
    let result =
      new Success(Constants.USER, req.user.safeJson())
      .add(Constants.NEW_USER, req.newUser)
    res.json(result);
  }

  /** Google Sign In (req is `any` b/c newUser info attached in passport) **/
  public googleSignIn(req: any, res: Response, next: NextFunction) {
    let result =
      new Success(Constants.USER, req.user.safeJson())
      .add(Constants.NEW_USER, req.newUser);
    res.json(result);
  }

  /** Local Sign Up **/
  public localSignUp(req: Request, res: Response, next: NextFunction) {
    // TODO
    res.json({});
  }

  /** Local Sign In **/
  public localSignIn(req: Request, res: Response, next: NextFunction) {
    // TODO
    res.json({});
  }

}
