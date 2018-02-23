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

  journey: any = null;
  date: Date;
  contacts: ContactModel[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public sms:SMS,public sharing: SocialSharing,public sqliteService: SqliteService,public datepipe: DatePipe) {

    this.journey = navParams.get('journey') ;
    console.log(this.journey[0].arrival_date_time);

    this.date=new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.getContact();

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
            this.sharing.shareVia("com.facebook.orca",'Mon train part à  ' +this.TimeDisplay(this.journey[0].departure_date_time));
          }
        },
        {
          text: 'Sms',
          handler: () => {
            for(let entry of this.contacts){
              this.sms.send(entry.phoneNumber , 'Mon train part à  ' +this.TimeDisplay(this.journey[0].departure_date_time));
            }
          }
        }
      ]
    });
    alert.present();
  }


}
