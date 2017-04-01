import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {Base} from './Base';
import {Safe} from './Safe';
import {User} from './User';
import {Constants} from '../utils/Constants';
import * as Crypto from 'crypto';

@Entity('sessions')
export class Session extends Base implements Safe  {

  @Column('string')
  sessionToken: string;

  @Column('date')
  expiresAt: Date;

  @Column('string')
  updateToken: string;

  @Column('boolean')
  isActive: boolean;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  /** Constructor **/
  constructor(user : User) {
    super();
    this.assignCreds();
    this.isActive = true;
    this.user = user;
  }

  /** Generates a session / update token **/
  private generateToken() : string {
    return Crypto.randomBytes(64).toString('hex');
  }

  /** Generates expiration time that is 7 days
  into the future from now **/
  private expTime() : Date {
    return new Date(Date.now() + (1000 * 60 * 60 * 24 * 7));
  }

  /** Assigns `sessionToken`, `expiresAt`, and `updateToken` **/
  private assignCreds() : void {
    this.sessionToken = this.generateToken();
    this.expiresAt = this.expTime();
    this.updateToken = this.generateToken();
  }

  /** Updates this session and returns itself **/
  update() : Session {
    this.assignCreds();
    return this;
  }

  /** Safe Json **/
  safeJson() : any {
    return this.copy();
  }

  /** Limited Json **/
  limitedJson() : any {
    return this.safeJson();
  }

}
