import {Router, Request, Response, NextFunction} from 'express';
import * as util from 'util';
import * as FB from 'fb';

class UsersRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public fbLogin(req: Request, res: Response, next: NextFunction) {
    const fields = ['id', 'name', 'email', 'picture.type(large)'];
    const token = req.param("accessToken");
    FB.api('me', { fields: fields, access_token: token }, r => {
      res.json(r);
    });
  }

  public googleLogin(req: Request, res: Response, next:  NextFunction) {
    // TODO
    res.json({});
  }

  init() {
    this.router.post('/fb', this.fbLogin);
    this.router.post('/google', this.googleLogin);
  }

}

const usersRouter = new UsersRouter();
export default usersRouter.router;
