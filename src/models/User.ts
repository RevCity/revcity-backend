import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Base} from './Base';
import {Constants} from '../utils/Constants';
import * as Promise from 'bluebird';
import * as Password from 'password-hash-and-salt';

@Entity('users')
export class User extends Base {

  @Column('string')
  facebookId: string;

  @Column('string')
  googleId: string;

  @Column('string')
  email: string;

  @Column('string')
  firstName: string;

  @Column('string')
  lastName: string;

  @Column('string')
  imageUrl: string;

  @Column('int')
  phone: number;

  @Column('date')
  birthday: Date;

  @Column('string', { length: 1 })
  gender: string // 'm' = male, 'f' = female, 'o' = other

  @Column('string')
  passwordDigest: string;

  /** User from Native Sign Up **/
  static fromNativeSignUp() : User {
    // TODO
    return null;
  }

  /** User from Google Sign Up **/
  static fromGoogleSignUp() : User {
    // TODO
    return null;
  }

  /** User from Facebook Sign Up **/
  static fromFBSignUp(): User {
    // TODO
    return null;
  }

  /** Set user's password digest **/
  setPasswordDigest(password: string) : Promise<User> {
    let p : any = Promise.promisifyAll(Password(password));
    return p.hashAsync().then(hash => {
      this.passwordDigest = hash;
      return Promise.resolve(this);
    }).catch(err => {
      console.log(err);
      return Promise.resolve(this);
    })
  }

  /** Set this user's gender **/
  setGender(gender : string) : Promise<User> {
    switch(gender) {
      case 'female':
        this.gender = Constants.FEMALE;
        break;
      case 'male':
        this.gender = Constants.MALE;
        break;
      case 'other':
        this.gender = Constants.OTHER;
        break;
      default:
        throw new Error('Unrecognized gender expression');
    }
    return Promise.resolve(this);
  }

}
