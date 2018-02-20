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

    if (typeof keyword != "undefined" && keyword.length >=4) {
      if ((keyword!="Gare") && (keyword!="Gare ") && (keyword!="Gare d") && (keyword!="Gare de"))  {
        if (keyword.toLowerCase().includes("Gare de ".toLowerCase())==true) {

          console.log("IIIIINCLUUUUUS");
          if (keyword.length >=11) {
            
            return this.http.get("assets/json/stations.json")
            .map(
              result =>
              {
                console.log(result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())));
    
                return result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
              }
    
            );
          }else {
            return of({});
          }  
        }
        else {
          return this.http.get("assets/json/stations.json")
            .map(
              result =>
              {
                console.log(result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())));

                return result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
              }

            ); 
        }
      }else {
        return of({});
      }
    }else {
      return of({});
    }
  }
}
