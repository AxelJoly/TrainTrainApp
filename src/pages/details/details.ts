import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {GareModel} from "../../entity/GareModel";
import {DataProvider} from "../../providers/data/data";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public data: DataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }


}
