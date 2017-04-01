import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Embedded
} from 'typeorm';
import {Skip} from "serializer.ts/Decorators";
import {serialize} from "serializer.ts/Serializer";
import * as Promise from 'bluebird';
import * as Password from 'password-hash-and-salt';
import {Base} from './Base';
import {JsonScope} from './JsonScope';
import {Session} from './Session';
import {Constants} from '../utils/Constants';
import {FacebookSignInResult} from '../schemas/FacebookSignInResult';
import {GoogleSignInResult} from '../schemas/GoogleSignInResult';

@Entity('users')
export class User extends Base implements JsonScope {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('string', {
    nullable: true,
    default: null
  })
  facebookId: string;

  @Column('string', {
    nullable: true,
    default: null
  })
  googleId: string;

  @Column('string', {
    default: ''
  })
  email: string;

  @Column('string', {
    default: ''
  })
  name: string;

  @Column('string', {
    default: ''
  })
  imageUrl: string;

  @Column('int', {
    nullable: true,
    default: null
  })
  phone: number;

  @Column('date', {
    nullable: true,
    default: null
  })
  birthday: Date;

  @Column('string', {
    length: 1,
    nullable: true,
    default: null
  })
  gender: string // 'm' = male, 'f' = female, 'o' = other

  @Skip()
  @Column('string', {
    nullable: true,
    default: null
   })
  passwordDigest: string;

  @Embedded(type => Session)
  private session: Session;

  /** User from Native Sign Up **/
  public static fromNativeSignUp() : User {
    // TODO
    return null;
  }

  /** User from Google Sign Up **/
  public static fromGoogleSignUp(googleResult : GoogleSignInResult) : User {
    let u = new User();
    u.googleId = googleResult.googleId;
    u.email = googleResult.email;
    u.name = googleResult.givenName + ' ' + googleResult.familyName;
    u.imageUrl = googleResult.picture;
    u.session = new Session();
    return u;
  }

  /** User from Facebook Sign Up **/
  public static fromFBSignUp(facebookResult : FacebookSignInResult): User {
    let u = new User();
    u.facebookId = facebookResult.facebookId;
    u.email = facebookResult.email;
    u.name = facebookResult.name;
    u.imageUrl = facebookResult.picture;
    u.session = new Session();
    return u;
  }

  /** Set user's password digest **/
  setPasswordDigest(password: string) : Promise<User> {
    let p : any = Promise.promisifyAll(Password(password));
    return p.hashAsync().then(hash => {
      this.passwordDigest = hash;
      return Promise.resolve(this);
    }).catch(err => {
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

  /** Update session **/
  updateSession() : Promise<User> {
    return new Promise((resolve, reject) => {
      this.session.update();
      resolve(this);
    }) as Promise<User>;
  }

  /** Limited Json **/
  limitedJson() : any {
    let result = serialize(this);
    delete result.birthday;
    delete result.email;
    delete result.phone;
    delete result.session;
    return result;
  }

}
