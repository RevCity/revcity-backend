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

  /** Save user **/
  public saveUser(user: User) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.persist(user).then(user => {
        resolve(user);
      }).catch(err => {
        reject(err);
      })
    }) as Promise<User>;
  }

  /** Update the user session **/
  public updateUserSession(user: User) : Promise<User> {
    return new Promise((resolve, reject) => {
      user.updateSession()
      .then(user => {
        return this.db.persist(user);
      })
      .then(user => {
        resolve(user);
      }).catch(err => {
        reject(err);
      });
    }) as Promise<User>;
  }

  /** Get user by Id **/
  public getUserById(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.findOneById(id)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    }) as Promise<User>;
  }

  /** Get user by Google Id (plus join on session) **/
  public getUserByGoogleId(googleId: string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("user")
        .where("user.googleId = :googleId", { googleId: googleId })
        .getOne()
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    }) as Promise<User>;
  }

  /** Get user by Facebook Id (plus join on session) **/
  public getUserByFacebookId(facebookId: string) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.createQueryBuilder("user")
        .where("user.facebookId = :facebookId", { facebookId: facebookId })
        .getOne()
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    }) as Promise<User>;
  }

}
