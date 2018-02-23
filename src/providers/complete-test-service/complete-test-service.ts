import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'
import { of } from 'rxjs/Observable/of';

@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "name";
  selected;
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



                let stations = [];
                let index = 0;
                let filteredStations = result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));

                for (let i = 0; i < filteredStations.length; i++) {

                  let inside = false;
                  for(let j = 0; j< stations.length; j++){
                    if(stations[j].name == filteredStations[i].name){
                      inside = true;
                    }
                  }
                  if(inside == false){
                    stations[index] = filteredStations[i];

                    index++;
                  }

                }
                return stations;
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
                let stations = [];
                let index = 0;
                let filteredStations = result.json()
                  .filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));

                for (let i = 0; i < filteredStations.length; i++) {

                  let inside = false;
                  for(let j = 0; j< stations.length; j++){
                    if(stations[j].name == filteredStations[i].name){
                      inside = true;
                    }
                  }
                  if(inside == false){
                    stations[index] = filteredStations[i];
                    index++;
                  }
                }
                return stations;
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


  setSelected(selected){
    this.selected = selected;
  }

}
