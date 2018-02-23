import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GareModel} from "../../entity/GareModel";
import {Observable} from "rxjs/Observable";
import {TrajetsPage} from "../trajets/trajets";
import {SharedProvider} from "../../providers/shared/shared";



/**
 * Generated class for the GeolocalisationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-geolocalisation',
  templateUrl: 'geolocalisation.html',
})
export class GeolocalisationPage {

  public closestStations;

  public callback;
  constructor(public navCtrl: NavController, public navParams: NavParams,public share: SharedProvider) {

    this.closestStations = this.navParams.get("closestStations");
    console.log(this.closestStations);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeolocalisationPage');


  }

  public show(){

    console.log(this.closestStations);

  }

  public goHome(selectedStation){

    console.log("geoloc"+selectedStation);
    this.share.station = selectedStation;
    this.navCtrl.pop();

  }

  hack(val) {
    return Array.from(val);
  }



}
