import { CompleteTestService } from './../../providers/complete-test-service/complete-test-service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {SncfProvider} from "../../providers/sncf/sncf";
import {AutoCompleteComponent} from "ionic2-auto-complete";
import {SqliteService} from "../../providers/sqlite/SqliteService";
import { ResultsPage } from '../results/results';
import {GareModel} from "../../entity/GareModel";
import {GeolocalisationPage} from "../geolocalisation/geolocalisation";
import { Geolocation } from '@ionic-native/geolocation';
import {SharedProvider} from "../../providers/shared/shared";
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


export class TrajetsPage implements OnInit{

  @ViewChild('departure')
  departure: AutoCompleteComponent;
  @ViewChild('arrival')
  arrival: AutoCompleteComponent;

  public travels: any;
  public message: string;
  public stations;
  public closestStations: GareModel[];
  public default: GareModel;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public completeTestService: CompleteTestService,
              public data: DataProvider,
              private sncfProvider: SncfProvider,
              public sqliteService: SqliteService,
              private geolocation: Geolocation,
              public share: SharedProvider) {


  }

  public showTravels(form){
    if(this.default != null) {
      this.getTravelsAutoCompleted();
    }else{
      this.getTravels();
    }
    console.log(this.departure.getSelection().stop_lon + ";" +
    this.departure.getSelection().stop_lat + " " +
    this.arrival.getSelection().stop_lon + ";" +
    this.arrival.getSelection().stop_lat);


  }

  ngOnInit(){
    console.log(this.share.station);
    this.default = this.share.station;
  }

  ionViewDidEnter() {
    console.log("ionview");
    this.default = this.share.station;
    console.log(this.default);
  }

  public getTravels() {

      this.sncfProvider.getRepos(this.departure.getSelection().stop_lon,
                                 this.departure.getSelection().stop_lat,
                                 this.arrival.getSelection().stop_lon,
                                 this.arrival.getSelection().stop_lat).subscribe(val => {
          this.travels = val;
          this.navCtrl.push(ResultsPage, {firstPassed: this.travels});
        },
        error => {
          this.message = error.message;
        },
        () => console.log(this.travels)
      );
    }

  public getTravelsAutoCompleted() {

    this.sncfProvider.getRepos(String(this.default.stop_lon),
      String(this.default.stop_lat),
      this.arrival.getSelection().stop_lon,
      this.arrival.getSelection().stop_lat).subscribe(val => {
        this.travels = val;
        this.navCtrl.push(ResultsPage, {firstPassed: this.travels});
      },
      error => {
        this.message = error.message;
      },
      () => console.log(this.travels)
    );
  }

  public favoris(){
    this.sqliteService.createJourney(this.departure.getSelection(),this.arrival.getSelection());
  }

  public distance(): any {
    this.geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude
      let lng = resp.coords.longitude
      console.log(lat + ";" + lng)
      this.data.getData().subscribe(val => {
        this.closestStations = val
          this.stations = [];
          let index = 0;
          let lat1 = lat;
          let lon1 = lng;

          for (let i = 0; i < this.closestStations.length; i++) {
            let lat2 = this.closestStations[i].stop_lat;
            let lon2 = this.closestStations[i].stop_lon;

            // console.log('lat1: ' + lat1 + ' lat2: ' + lat2 + ' lon1: ' + lon1 + ' lon2: ' + lon2);
            let R = 6371; // km
            let dLat = this.toRad(lat2 - lat1);
            let dLon = this.toRad(lon2 - lon1);
            let rlat1 = this.toRad(lat1);
            let rlat2 = this.toRad(lat2);

            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rlat1) * Math.cos(rlat2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = R * c;

            if (d < 10) {
              let inside = false;
              for(let j = 0; j< this.stations.length; j++){
                if(this.stations[j].name == this.closestStations[i].name){
                  inside = true;
                }
              }
              if(inside == false){
                this.stations[index] = this.closestStations[i];
                this.stations[index].distance = d;
                console.log('value of index ' + i + ': ' + d + 'arret:' + this.stations[index].name);
                index++;
              }

            }
          }
          let stations = this.stations;
          console.log("mes stations");
          console.log(stations);
          this.navCtrl.push(GeolocalisationPage, {closestStations: stations});
          //return stations;
        },
        error => {
        console.log(error)
          return null;
        },
        //() => console.log(this.closestStations)

      );


    }).catch((error) => {
      console.log('Error getting location', error);
      return null;

    });



  }

  public toRad(value) {
    return value * Math.PI / 180;
  }

  public closestStation(){

    let stations = this.distance()
    console.log(stations)
    this.navCtrl.push(GeolocalisationPage, {closestStations: stations});
  }

}

