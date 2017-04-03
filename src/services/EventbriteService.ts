import * as Eventbrite from 'node-eventbrite';
import * as Promise from 'bluebird';
import * as moment from 'moment';

export class EventbriteService {

  private eventBriteApi : any;

  /* For singleton pattern */
  private static _instance : EventbriteService;

  /* Get singleton instance */
  public static getInstance() : EventbriteService {
    return this._instance || (this._instance = new this());
  }

  /** Constructor **/
  private constructor() {
    this.eventBriteApi = new Eventbrite({
      token: process.env.EVENTBRITE_TOKEN,
      version: 'v3'
    });
  }

  /** Search events **/
  public searchEvents(request : any) : Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(moment().format('YYYY-MM-DDThh:mm:ss'));
      let params = {
        'location.latitude': request.lat,
        'location.longitude': request.lng,
        'location.within': request.radius ? request.radius + 'km' : '10km',
        'start_date.range_start': request.since ?
                                  moment(request.since).format('YYYY-MM-DDThh:mm:ss') :
                                  moment().format('YYYY-MM-DDThh:mm:ss'),
        'start_date.range_end': request.until ?
                                moment(request.until).format('YYYY-MM-DDThh:mm:ss') :
                                undefined
      }
      this.eventBriteApi.search(params, (err, data) =>{
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }

}
