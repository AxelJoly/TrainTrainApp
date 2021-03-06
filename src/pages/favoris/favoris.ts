import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {SqliteService} from "../../providers/sqlite/SqliteService";
import {JourneyModel} from "../../entity/JourneyModel";
import {Observable} from "rxjs/Observable";
import {ResultsPage} from "../results/results";
import {SncfProvider} from "../../providers/sncf/sncf";

/**
 * Generated class for the FavorisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {


  journeys: JourneyModel[] = [];
  private getDataObserver: any;
  public getData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public sqliteService: SqliteService,public loadingCtrl: LoadingController,private sncfProvider: SncfProvider) {
    this.getData = Observable.create(observer => {
      this.getDataObserver = observer;
    });
  }

  ionViewDidLoad() {

    this.sqliteService.getDataBaseJourney();


    console.log('ionViewDidLoad FavorisPage');

    this.getFavoris();
    this.sqliteService.getData.subscribe(()=> {
      this.getFavoris();
    });
    this.getData.subscribe(()=>{
      this.sqliteService.getDataBaseJourney();
    })
  }

  public getFavoris(){

    console.log('get favoris');

    this.sqliteService.getJourney().subscribe(val => {

      console.log('get journey');

      this.journeys = val;

      for(let entry of this.journeys){
        console.log('favoris deaprt'+entry.gare_depart.name);
        console.log('favoris arrivee'+entry.gare_arrivee.name);
      }
    });
  }

  public delete(id: number){
    this.sqliteService.deleteJourney(id);
    this.getDataObserver.next();
  }

  public search(favoris: JourneyModel){

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Recherche de nos meilleurs trains...',

    });


    loading.present().then(() => {
        this.sncfProvider.getRepos(favoris.gare_depart.stop_lon.toString(),
          favoris.gare_depart.stop_lat.toString(),
          favoris.gare_arrivee.stop_lon.toString(),
          favoris.gare_arrivee.stop_lat.toString()).subscribe(val => {



            this.navCtrl.push(ResultsPage, {firstPassed: val});
          },
          error => {
            
          },
          () => loading.dismiss()

        );
      }

    );

  }

}
