import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GareModel} from "../../entity/GareModel";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the GeolocalisationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geolocalisation',
  templateUrl: 'geolocalisation.html',
})
export class GeolocalisationPage {

  public closestStations;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.closestStations = this.navParams.get("closestStations");


    console.log(this.closestStations);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeolocalisationPage');


  }

  public show(){
    let closestStations =
    console.log(this.navParams.get("closestStations"));
    console.log(closestStations);
  }

  hack(val) {
    return Array.from(val);
  }



}
