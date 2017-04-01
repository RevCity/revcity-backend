import {
  EmbeddableEntity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import {Base} from './Base';
import {Constants} from '../utils/Constants';
import * as Crypto from 'crypto';

@EmbeddableEntity()
export class Session {

  @Column('string')
  sessionToken: string;

  @Column('date')
  expiresAt: Date;

  @Column('string')
  updateToken: string;

  @Column('boolean')
  isActive: boolean;

  /** Constructor **/
  constructor() {
    this.assignCreds();
    this.isActive = true;
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

}
