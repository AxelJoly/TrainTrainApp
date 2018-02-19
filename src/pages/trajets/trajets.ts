import { CompleteTestService } from './../../providers/complete-test-service/complete-test-service';
import {Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {SncfProvider} from "../../providers/sncf/sncf";
import {AutoCompleteComponent} from "ionic2-auto-complete";
import {SqliteService} from "../../providers/sqlite/SqliteService";
/**
 * Generated class for the TrajetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-trajets',
  templateUrl: 'trajets.html',
})


export class TrajetsPage {

  @ViewChild('departure')
  departure: AutoCompleteComponent;
  @ViewChild('arrival')
  arrival: AutoCompleteComponent;

  public travels: any;
  public message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public completeTestService: CompleteTestService, public data: DataProvider, private sncfProvider: SncfProvider,public sqliteService: SqliteService) {

  }

  public showTravels(form){
  console.log(this.departure.getSelection().stop_lon + ";" +
    this.departure.getSelection().stop_lat + " " +
    this.arrival.getSelection().stop_lon + ";" +
    this.arrival.getSelection().stop_lat);
  this.getTravels();
  }

  public getTravels(){
    this.sncfProvider.getRepos(this.departure.getSelection().stop_lon,
                               this.departure.getSelection().stop_lat,
                               this.arrival.getSelection().stop_lon,
                               this.arrival.getSelection().stop_lat).subscribe(val =>
      {
        this.travels = val;
      },
      error => {
        this.message = error.message;
      },
      () => console.log(this.travels)
    );
  }
  public favoris(){

    if((this.departure.getSelection()!=null)&&(this.arrival.getSelection()!=null)){

      this.sqliteService.createJourney(this.departure.getSelection(),this.arrival.getSelection());
    }

  }
}
