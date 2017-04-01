import * as Promise from 'bluebird';
import * as passport from 'passport';
import * as util from 'util';
import * as CustomStrategy from 'passport-custom';
import * as BasicStrategy from 'passport-http';
import {getConnectionManager} from 'typeorm';
import {FacebookService} from '../services/FacebookService';
import {GoogleService} from '../services/GoogleService';
import {UsersRepo} from '../repos/UsersRepo';
import {Session} from '../models/Session';
import {User} from '../models/User';
import {Constants} from '../utils/Constants';

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
    this.addLocalSignIn();
    this.addGoogleSignIn();
    this.addFacebookSignIn();
    this.addTokenSession();
  }

  /** Serialize user to add the user to the request **/
  public static addSerializeUser() : void {
    passport.serializeUser((user: User, done) => {
      return done(null, user);
    });
  }

  /** Deserialize the user to grab it from the request **/
  public static addDeserializeUser() : void {
    passport.deserializeUser((user: User, done) => {
      return done(null, user);
    });
  }

  /** Creates local sign IN strategy (Http Basic + form submission) **/
  public static addLocalSignIn() : void {

  }

  /** Creates Custom Authentication for Google Sign In **/
  public static addGoogleSignIn() : void {
    let db = getConnectionManager().get().getRepository(User);
    passport.use(Constants.GOOGLE_SIGN_IN_STRATEGY, new CustomStrategy((req, done) => {
      GoogleService.getInstance().getUserFromToken(req.query.token)
        .then(resp => {
          UsersRepo.getInstance().getUserByGoogleId(resp.googleId)
            .then(user => {
              req.newUser = user == undefined;
              return user ?
                UsersRepo.getInstance().updateUserSession(user) :
                UsersRepo.getInstance().saveUser(User.fromGoogleSignUp(resp));
            })
            .then(user => {
              done(null, user);
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
          UsersRepo.getInstance().getUserByFacebookId(resp.facebookId)
            .then(user => {
              req.newUser = user == undefined;
              return user ?
                UsersRepo.getInstance().updateUserSession(user) :
                UsersRepo.getInstance().saveUser(User.fromFBSignUp(resp));
            })
            .then(user => {
              done(null, user);
            });
        });
    }));
  }

  /** Creates Custom Authentication for Token-Based Sessions **/
  public static addTokenSession() : void {

  }


}
