import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {GareModel} from "../../Entity/GareModel";
import {SncfProvider} from "../../providers/sncf/sncf";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  stationArray: GareModel[];
  parts: string[];
  public travels: any;
  public message: string;
  startLong: string;
  startLat: string;
  finalLong: string;
  finalLat: string;
  private getDataObserver: any;
  public getData2: any;

  constructor(public navCtrl: NavController,public data: DataProvider, private sncfProvider: SncfProvider) {


    this.getDataObserver = null;
    this.getData2 = Observable.create(observer => {
      this.getDataObserver = observer;
    });
  }
  ngOnInit(){
   // this.getData();
    this.getData2.subscribe( ()=>{
     // this.getTravels(this.startLong, this.startLat, this.finalLong, this.finalLat);
    });


  }

 /* public getData(){

    this.data.getData().subscribe(val =>{
      this.stationArray = val;

      for(let entry of this.stationArray){
       // console.log(entry.stop_name);

        if(entry.name == "Gare de Montauban-de-Bretagne"){
          this.parts = entry.stop_id.split(/[-:E]/);
        }
      }


      if(this.parts[0]=="StopPoint"){
       // console.log("https://api.sncf.com/v1/coverage/sncf/physical_modes/physical_mode%3ALocalTrain/stop_points/stop_point%3AOCE%3ASP%3ATrainTER-"+this.parts[4]+"/departures");

       // this.sncfProvider.getRepos(this.parts[4]);
        this.city = "stop_point%3AOCE%3ASP%3ATrainTER-" + this.parts[4];
      }
      else if(this.parts[0]=="StopArea"){
        console.log("https://api.sncf.com/v1/coverage/sncf/physical_modes/physical_mode%3ALocalTrain/stop_points/stop_point%3AOCE%3ASP%3ATrainTER-"+this.parts[2]+"/departures");
        this.city = "stop_point%3AOCE%3ASP%3ATrainTER-" + this.parts[2];
      }
    //  this.parts = this.item.date.split(/[ /h]/);

      this.getDataObserver.next();

    });
  }*/

  public getTravels(startLong: string, startLat: string, finalLong: string, finalLat: string){
    this.sncfProvider.getRepos(startLong, startLat, finalLong, finalLat).subscribe(val =>
      {
        this.travels = val;
      },
      error => {
        this.message = error.message;
      },
      () => console.log('get terminé: ' + this.travels.departures[0].display_informations.direction)
    );
  }


}
