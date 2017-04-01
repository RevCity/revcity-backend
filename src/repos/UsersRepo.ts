import * as Promise from 'bluebird';
import * as util from 'util';
import {getConnectionManager, Repository} from 'typeorm';
import {User} from '../models/User';
import {Session} from '../models/Session';
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

  /** Save user **/
  public saveUser(user: User) : Promise<User> {
    return new Promise((resolve, reject) => {
      return this.db.persist(user).then(u => {
        resolve(u);
      }).catch(err => {
        reject(err);
      })
    }) as Promise<User>;
  }

  /** Get user by Google Id (plus join on session) **/
  public getUserByGoogleId(googleId: string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("user")
        .where("user.googleId = :googleId", { googleId: googleId })
        .leftJoin(Session, "session", "session.user = :user.id")
        .getOne()
    }) as Promise<User>;
  }

  /** Get user by Facebook Id (plus join on session) **/
  public getUserByFacebookId(facebookId: string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("user")
        .where("user.facebookId = :facebookId", { facebookId: facebookId })
        .leftJoin(Session, "session", "session.user = :user.id")
        .getOne()
    }) as Promise<User>;
  }

}
