import * as Promise from 'bluebird';
import * as util from 'util';
import {getConnectionManager, Repository} from 'typeorm';
import {Session} from '../models/Session';
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
