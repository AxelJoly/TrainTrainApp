import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
}