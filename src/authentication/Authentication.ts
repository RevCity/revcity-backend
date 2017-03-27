import * as Promise from 'bluebird';
import * as passport from 'passport';
import * as util from 'util';
import {getConnectionManager} from 'typeorm';
import {FacebookService} from '../services/FacebookService';
import {GoogleService} from '../services/GoogleService';
import {User} from '../models/User';
import {Constants} from '../utils/Constants';
import * as CustomStrategy from 'passport-custom';
import * as BasicStrategy from 'passport-http';

/**
 * Establishes all passport authentication wrappers
 */
export class Authentication {


  /** Private b/c this should only be used statically **/
  private constructor() {}


  /** Setup passport **/
  public static setupPassport() : void {
    // Necessary
    this.addSerializeUser();
    this.addDeserializeUser();
    this.addHttpBasic();
    this.addGoogleSignIn();
    this.addFacebookSignIn();
    this.addTokenSession();
  }


  /**  **/
  public static addSerializeUser() : void {
    passport.serializeUser((user: User, done) => {
      return done(null, user);
    });
  }


  /** **/
  public static addDeserializeUser() : void {
    passport.deserializeUser((user: User, done) => {
      return done(null, user);
    });
  }


  /** Creates Http Basic Authentication strategy for Passport **/
  public static addHttpBasic() : void {

  }


  /** Creates Custom Authentication for Google Sign In **/
  public static addGoogleSignIn() : void {var CustomStrategy = require('passport-custom');
    let db = getConnectionManager().get().getRepository(User);
    passport.use(Constants.GOOGLE_SIGN_IN_STRATEGY, new CustomStrategy((req, done) => {
      GoogleService.getInstance().getUserFromToken(req.query.token)
        .then(resp => {
          db.createQueryBuilder("user")
            .where("user.googleId = :googleId")
            .setParameter("googleId", resp.googleId)
            .getOne()
            .then(user => {
              return user ? Promise.resolve(user) : db.persist(User.fromGoogleSignUp(resp));
            })
            .then(user => {
              return done(null, user);
            });
        });
    }));
  }


  /** Creates Custom Authentication for Facebook Sign In **/
  public static addFacebookSignIn() : void {
    let db = getConnectionManager().get().getRepository(User);
    passport.use(Constants.FB_SIGN_IN_STRATEGY, new CustomStrategy((req, done) => {
      FacebookService.getInstance().getUserFromToken(req.query.token)
        .then(resp => {
          db.createQueryBuilder("user")
            .where("user.facebookId = :facebookId")
            .setParameter("facebookId", resp.facebookId)
            .getOne()
            .then(user => {
              return user ? Promise.resolve(user) : db.persist(User.fromFBSignUp(resp));
            })
            .then(user => {
              return done(null, user);
            })
        });
    }));
  }


  /** Creates Custom Authentication for Token-Based Sessions **/
  public static addTokenSession() : void {

  }


}
