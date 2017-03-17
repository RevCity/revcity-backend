import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as logger from 'morgan';

class App {

  public express: express.Application;

  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  private routes(): void {
    // TODO
  }

}

export default new App().express;
