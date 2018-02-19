import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { of } from 'rxjs/Observable/of';

@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "name";

  constructor(private http: Http) {

  }
  getResults(keyword:string) {
    console.log(keyword);

    if (typeof keyword != "undefined" && keyword.length >=3) {
      return this.http.get("assets/json/stations.json")
        .map(
          result =>
          {
            console.log(result.json()
              .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())))

            return result.json()
              .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
          }

        );
    }
    else {
      return of({});
    }
  }
}
