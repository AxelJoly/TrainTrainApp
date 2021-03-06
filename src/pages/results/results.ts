import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DetailsPage} from "../details/details";

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public params;
  journey: any;
  //keys: String[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    Array.from(this.params = navParams.get("firstPassed"));


    console.log(this.params);
    /*   this.getJourney(); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  ngOnInit() {
    /* this.keys = Object.keys(this.params);
    console.log(this.keys); */
  }

  hack(val) {
    return Array.from(val);
  }

  timeDisplayDeparture(string) {
    let day: String;
    let month: String;
    let year: String;
    let hour: String;
    let minutes: String;
    let res: String;

    year = string.slice(0, 4);
    month = string.slice(4, 6);
    day = string.slice(6, 8);
    hour = string.slice(9, 11);
    minutes = string.slice(11, 13);

    res = day + "/" + month + "/" + year + " de " + hour + ":" + minutes;

    return res;
  }
  timeDisplayArrival(string) {
    let day: String;
    let month: String;
    let year: String;
    let hour: String;
    let minutes: String;
    let res: String;

    year = string.slice(0, 4);
    month = string.slice(4, 6);
    day = string.slice(6, 8);
    hour = string.slice(9, 11);
    minutes = string.slice(11, 13);

    res = /* day+"/"+month+"/"+year+ */" à " + hour + ":" + minutes;

    return res;
  }
  dateDisplay(string) {
    let day: String;
    let month: String;
    let year: String;
    let res: String;

    year = string.slice(0, 4);
    month = string.slice(4, 6);
    day = string.slice(6, 8);

    res = day + "/" + month + "/" + year;

    return res;
  }

  durationDisplay(departure, arrival) {
    let hourDeparture: number;
    let minutesDeparture: number;
    let hourArrival: number;
    let minutesArrival: number;

    hourDeparture = parseInt(departure.slice(9, 11));
    minutesDeparture = parseInt(departure.slice(11, 13));
    hourArrival = parseInt(arrival.slice(9, 11));
    minutesArrival = parseInt(arrival.slice(11, 13));


    if (hourDeparture > hourArrival) {
      if (minutesDeparture > minutesArrival) {

        if (hourArrival + 23 - hourDeparture < 10) {

          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ("0" + (hourArrival + 23 - hourDeparture) + "h0" + (minutesArrival + 60 - minutesDeparture));
          } else {
            return ("0" + (hourArrival + 23 - hourDeparture) + "h" + (minutesArrival + 60 - minutesDeparture));
          }
        } else {
          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ((hourArrival + 23 - hourDeparture) + "h0" + (minutesArrival + 60 - minutesDeparture));
          } else {
            return ((hourArrival + 23 - hourDeparture) + "h" + (minutesArrival + 60 - minutesDeparture));
          }
        }

      } else {
        if (hourArrival + 24 - hourDeparture < 10) {

          if (minutesArrival - minutesDeparture < 10) {
            return ("0" + (hourArrival + 24 - hourDeparture) + "h0" + (minutesArrival - minutesDeparture));
          } else {
            return ("0" + (hourArrival + 24 - hourDeparture) + "h" + (minutesArrival - minutesDeparture));
          }
        } else {
          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ((hourArrival + 24 - hourDeparture) + "h0" + (minutesArrival - minutesDeparture));
          } else {
            return ((hourArrival + 24 - hourDeparture) + "h" + (minutesArrival - minutesDeparture));
          }
        }
        //return ((hourArrival+24-hourDeparture)+":"+(minutesArrival-minutesDeparture));
      }
    } else {
      if (minutesDeparture > minutesArrival) {

        if (hourArrival - 1 - hourDeparture < 10) {

          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ("0" + (hourArrival - 1 - hourDeparture) + "h0" + (minutesArrival + 60 - minutesDeparture));
          } else {
            return ("0" + (hourArrival - 1 - hourDeparture) + "h" + (minutesArrival + 60 - minutesDeparture));
          }
        } else {
          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ((hourArrival - 1 - hourDeparture) + "h0" + (minutesArrival + 60 - minutesDeparture));
          } else {
            return ((hourArrival - 1 - hourDeparture) + "h" + (minutesArrival + 60 - minutesDeparture));
          }
        }

      } else {
        if (hourArrival - hourDeparture < 10) {

          if (minutesArrival - minutesDeparture < 10) {
            return ("0" + (hourArrival - hourDeparture) + "h0" + (minutesArrival - minutesDeparture));
          } else {
            return ("0" + (hourArrival - hourDeparture) + "h" + (minutesArrival - minutesDeparture));
          }
        } else {
          if (minutesArrival + 60 - minutesDeparture < 10) {
            return ((hourArrival - hourDeparture) + "h0" + (minutesArrival - minutesDeparture));
          } else {
            return ((hourArrival - hourDeparture) + "h" + (minutesArrival - minutesDeparture));
          }
        }
      }
    }
  }

  TimeDisplay(string) {
    let hour: String;
    let minutes: String;
    let res: String;

    hour = string.slice(9, 11);
    minutes = string.slice(11, 13);

    res = hour + ":" + minutes;

    return res;
  }

  startPoint(string){
    for(let i = 0; i<string.length; i++){
      if(string[i].display_informations != null){
        return (this.TimeDisplay(string[i].base_departure_date_time)+ " - " + string[i].from.name);
      }
    }
  }

  stopPoint(string){
    for(let i = string.length-1; i>=0; i--){
      if(string[i].display_informations != null){
        return (this.TimeDisplay(string[i].base_arrival_date_time)+ " - " + string[i].to.name);
      }
    }
  }

  changeCounter(string){
    let counter = 0;
    for(let i = 0; i<string.length; i++){
      if(string[i].display_informations != null){
        counter++;
      }
    }
    if((counter-1)>0){
      if((counter-1)>1){
        return ((counter-1)+" changements");
      } else {
        return ((counter-1)+" changement");
      }
    } else {
      return "Trajet direct";
    }
  }


  public detail(journey, journeys){
    //console.log(journey[0].arrival_date_time);
    this.navCtrl.push(DetailsPage, {
      journey: journey,
      journeys: journeys
    });
  }
}
