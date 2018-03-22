import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import {SMS} from "@ionic-native/sms";
import {SqliteService} from "../../providers/sqlite/SqliteService";
import {ContactModel} from "../../entity/ContactModel";
import {DatePipe} from "@angular/common";


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  journey: any;
  journeys: any;
  sections: any;
  date: Date;
  contacts: ContactModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public sms:SMS,public sharing: SocialSharing,public sqliteService: SqliteService,public datepipe: DatePipe) {

    //this.journey = navParams.get('journey') ;
    Array.from(this.journey = navParams.get("journey"));
    this.journeys = navParams.get("journeys");
    this.sections = this.OnlyChange(Array.from(navParams.get("journey")));

    for(let entry of this.sections){
      console.log("entry sections= "+entry.from.stop_point.name);
      console.log("entry sections= "+this.TimeDisplay(entry.departure_date_time));
      console.log("entry sections= "+this.TimeDisplay(entry.arrival_date_time));
      console.log("entry sections= "+entry.to.stop_point.name);
      console.log("entry sections= "+entry.duration);
    }
    console.log("journey= "+this.journey);
    console.log("journeys= "+this.TimeDisplay(this.journeys.departure_date_time));

    console.log("journeys= "+this.TimeDisplay(this.journeys.arrival_date_time));
    console.log("section = "+this.sections);

    this.date=new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.getContact();
    this.saveVoyage();

  }

  public saveVoyage(){
    console.log('save voyage');
    this.sqliteService.getDataBaseChangements();
    this.sqliteService.getData2.subscribe(()=>{

      console.log('getData2 lol')
      this.sqliteService.getChangments().subscribe(val=>{
        console.log('get changement');
        for(let entry of val){
          this.sqliteService.deleteChangements(entry.id);
        }
        this.sqliteService.createChangements(this.sections);
      });

    });


  }
  public getContact(){


    this.sqliteService.getContact().subscribe(val=>{

      this.contacts = val;
      for(let entry of val){
        console.log(entry.phoneNumber);
        console.log(entry.name);
      }
    });
  }

  OnlyChange(string){

    for(let i=0; i<string.length; i++){
      if (string[i].display_informations == null){
        string.splice(i, 1);
        i--;
      }
    }
    return string;
  }

  hack(val) {
    return Array.from(val);
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

  public share(){

    console.log("share");
    this.date.setDate(this.journey[0].arrival_date_time)

   // this.date=this.journey[0].arrival_date_time;

    console.log(this.TimeDisplay(this.journey[0].departure_date_time));

    let alert = this.alertCtrl.create({
      title: 'Share',
      message: 'Sms or Messenger',
      buttons: [
        {
          text: 'Messenger',

          handler: () => {
            this.sharing.shareVia("com.facebook.orca",'Mon train part à ' +this.TimeDisplay(this.journey[0].departure_date_time));
          }
        },
        {
          text: 'Sms',
          handler: () => {
            for(let entry of this.contacts){
              this.sms.send(entry.phoneNumber , 'Mon train part à ' +this.TimeDisplay(this.journey[0].departure_date_time));
            }
          }
        }
      ]
    });
    alert.present();
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

  timeLeft(string){

    let currentDate = new Date();
    let hour: number;
    let minutes: number;
    let hourNow = parseInt(currentDate.toString().slice(16,18));
    let minutesNow = parseInt(currentDate.toString().slice(19,21));
    hour = parseInt(string.slice(9, 11));
    minutes = parseInt(string.slice(11, 13));

    if (hourNow > hour) {
      if (minutesNow > minutes) {

        if (hour + 23 - hourNow < 10) {

          if (minutes + 60 - minutesNow < 10) {
            return ("0" + (hour + 23 - hourNow) + "h et 0" + (minutes + 60 - minutesNow)+ "min");
          } else {
            return ("0" + (hour + 23 - hourNow) + "h et " + (minutes + 60 - minutesNow)+ "min");
          }
        } else {
          if (minutes + 60 - minutesNow < 10) {
            return ((hour + 23 - hourNow) + "h et 0" + (minutes + 60 - minutesNow)+ "min");
          } else {
            return ((hour + 23 - hourNow) + "h et" + (minutes + 60 - minutesNow)+ "min");
          }
        }

      } else {
        if (hour + 24 - hourNow < 10) {

          if (minutes - minutesNow < 10) {
            return ("0" + (hour + 24 - hourNow) + "h et 0" + (minutes - minutesNow)+ "min");
          } else {
            return ("0" + (hour + 24 - hourNow) + "h et " + (minutes - minutesNow)+ "min");
          }
        } else {
          if (minutes + 60 - minutesNow < 10) {
            return ((hour + 24 - hourNow) + "h et 0" + (minutes - minutesNow)+ "min");
          } else {
            return ((hour + 24 - hourNow) + "h et " + (minutes - minutesNow)+ "min");
          }
        }
        //return ((hourArrival+24-hourDeparture)+":"+(minutesArrival-minutesDeparture));
      }
    } else {
      if (minutesNow > minutes) {

        if (hour - 1 - hourNow < 10) {

          if (minutes + 60 - minutesNow < 10) {
            return ("0" + (hour - 1 - hourNow) + "h et 0" + (minutes + 60 - minutesNow)+ "min");
          } else {
            return ("0" + (hour - 1 - hourNow) + "h et " + (minutes + 60 - minutesNow)+ "min");
          }
        } else {
          if (minutes + 60 - minutesNow < 10) {
            return ((hour - 1 - hourNow) + "h et 0" + (minutes + 60 - minutesNow)+ "min");
          } else {
            return ((hour - 1 - hourNow) + "h et " + (minutes + 60 - minutesNow)+ "min");
          }
        }

      } else {
        if (hour - hourNow < 10) {

          if (minutes - minutesNow < 10) {
            return ("0" + (hour - hourNow) + "h et 0" + (minutes - minutesNow)+ "min");
          } else {
            return ("0" + (hour - hourNow) + "h et " + (minutes - minutesNow)+ "min");
          }
        } else {
          if (minutes + 60 - minutesNow < 10) {
            return ((hour - hourNow) + "h et 0" + (minutes - minutesNow)+ "min");
          } else {
            return ((hour - hourNow) + "h et " + (minutes - minutesNow)+ "min");
          }
        }
      }
    }
  }

  durationMinutes(string){
    return (parseInt(string)/60);
  }

}
