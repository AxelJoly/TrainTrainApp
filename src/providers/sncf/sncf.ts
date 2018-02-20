import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {UrlBuilder} from "./urlBuilder";
import { environment } from "../../env/environment";
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the SncfProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SncfProvider {

  private urlBuilder;
  constructor(public http: HttpClient) {
    console.log('Hello SncfProvider Provider');
    this.urlBuilder = new UrlBuilder(environment.SNCF_API_ROOT, environment.SCNF_API_TOKEN)

  }

  public getRepos(startLong: string, startLat: string, finalLong: string, finalLat: string): Observable<any[]> {
    let result: Observable<any[]> = this.http.get<any[]>(
      this.urlBuilder.getUrlForGetDepartures(startLong, startLat, finalLong, finalLat), {headers: new HttpHeaders({
        'Authorization': environment.SCNF_API_TOKEN
      })}

    );
    // results.catch(this.handleError)
    console.log(result + '+ null');
    return result;
  }
}
