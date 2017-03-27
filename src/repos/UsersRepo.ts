import * as Promise from 'bluebird';
import * as util from 'util';
import {getConnectionManager, Repository} from 'typeorm';
import {User} from '../models/User';
import {Constants} from '../utils/Constants';

export class UsersRepo {

  private db : Repository<User>;
  private static _instance : UsersRepo;

  /* Get Singleton Instance */
  public static getInstance() : UsersRepo {
    return this._instance || (this._instance = new this());
  }


  /** Constructor **/
  private constructor() {
    this.db = getConnectionManager().get().getRepository(User);
  }

  private query(q : string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("user")
        .where(q)
        .getOne().then(u => Promise.resolve);
    }) as Promise<User>;
  }

  private findBy(field: string, thing: string) : Promise<User> {
    return this.query(util.format("user.%s = %s", field, thing));
  }

  private findByS(field: string, thing: string) : Promise<User> {
    return this.query(util.format("user.%s = '%s'", field, thing));
  }

  public getUserByGoogleId(googleId: string) : Promise<User> {
    return this.findByS(Constants.GOOGLE_ID, googleId);
  }

  public getUserByFacebookId(facebookId: string) : Promise<User> {
    return this.findByS(Constants.FACEBOOK_ID, facebookId);
  }

}
