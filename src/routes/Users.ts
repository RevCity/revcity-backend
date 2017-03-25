import {Router, Request, Response, NextFunction} from 'express';
import * as util from 'util';
import * as Google from 'googleapis';
import FacebookService from '../services/FacebookService';
import GoogleService from '../services/GoogleService';

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
    const token = req.query.token;
    FacebookService.getInstance().getUserFromToken(token)
      .then(r => {
        res.json(r); // TODO - see below
      }); // then store, then respond to the user
  }

  /** Google Login **/
  public googleLogin(req: Request, res: Response, next:  NextFunction) {
    const token = req.query.token;
    GoogleService.getInstance().getUserFromToken(token)
      .then(r => {
        res.json(r); // TODO - see below
      }); // then store, then respond to the user
  }
  
}

const usersRouter = new UsersRouter();
export default usersRouter.router;
