import * as util from 'util';
import * as passport from 'passport';
import {Router, Request, Response, NextFunction} from 'express';
import {FacebookService} from '../services/FacebookService';
import {Constants} from '../utils/Constants';
import {Success, Failure} from '../responses/Responses';

export class EventsRouter {

  router: Router;

  /** Constructor **/
  constructor() {
    this.router = Router();
    this.init();
  }

  /** Setup all endpoints **/
  init() {
    this.router.get('/fb',
      this.getFbEvents
    );

    this.router.get('/eventbrite',
      this.getEventbriteEvents
    );
  }

  /** Get Facebook events **/
  public getFbEvents(req: Request, res: Response, next: NextFunction) {
    FacebookService.getInstance().searchEvents({
      lat: req.query.lat,
      lng: req.query.lng
    }).then(events => {
      res.json(new Success(Constants.EVENTS, events));
    }).catch(err => {
      res.json(new Failure(err));
    });
  }

  /** Get Eventbrite events **/
  public getEventbriteEvents(req: Request, res: Response, next: NextFunction) {
    // TODO
    res.json({});
  }

}
