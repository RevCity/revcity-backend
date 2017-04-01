import * as Promise from 'bluebird';
import * as util from 'util';
import {getConnectionManager, Repository} from 'typeorm';
import {Session} from '../models/Session';
import {User} from '../models/User';
import {Constants} from '../utils/Constants';

export class SessionsRepo {

  private db : Repository<Session>;
  private static _instance : SessionsRepo;

  /* Get Singleton Instance */
  public static getInstance() : SessionsRepo {
    return this._instance || (this._instance = new this());
  }

  /** Constructor **/
  private constructor() {
    this.db = getConnectionManager().get().getRepository(Session);
  }

  /** User has been stored, create the session from the user **/
  public establishSessionFromUser(user : User) : Promise<User> {
    let sess = user.session ? user.session.update() : new Session(user);
    return new Promise((resolve, reject) => {
      this.db.persist(user.session).then(s => {
        return user.setSession(s);
      });
    }) as Promise<User>;
  }

  /** Store session accordingly **/
  public storeSession(session : Session) : Promise<Session> {
    return new Promise((resolve, reject) => {
      this.db.persist(session).then(s => {
        resolve(s);
      })
    }) as Promise<Session>;
  }

  /** Get a session by userId **/
  public getSessionByUserId(userId: number) : Promise<Session> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("session")
        .where(util.format("post.%s = %s", Constants.USER, userId))
        .getOne()
      .then(s => {
        return s ? resolve(s) : reject(s);
      });
    }) as Promise<Session>;
  }

}
