import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import * as logger from 'morgan';

/* Authentication garbage */
import {Authentication} from './authentication/Authentication';

/* All routes */
import {UsersRouter} from './routes/Users';

class App {

  public express: express.Application;

  constructor() {
    dotenv.config();
    this.express = express();
    this.middleware();
    this.routes();
    Authentication.setupPassport();
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
    this.express.use('/users/', new UsersRouter().router);
  }

}

export default App;
