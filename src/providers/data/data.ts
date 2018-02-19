import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GareModel} from "../../entity/GareModel";
import 'rxjs/add/operator/catch';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {



  constructor(private http: HttpClient ) { }


  public getData(): Observable<GareModel[]> {


    let result: Observable<GareModel[]> = this.http.get<GareModel[]>('assets/json/stations.json');

    result.catch(this.handleError);
    return result;
  }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    console.debug('error dans get data');

    if (error instanceof Response) {
    }
    console.error(errMsg);
    return Observable.throw(errMsg);


  }

}

