
import {Injectable} from "@angular/core";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Observable} from "rxjs/Observable";
import {ContactModel} from "../../entity/ContactModel";
import {GareModel} from "../../entity/GareModel";
import {JourneyModel} from "../../entity/JourneyModel";
import {ChangmentModel} from "../../entity/ChangmentModel";



@Injectable()
export class SqliteService {






  journey: JourneyModel;
  journeys: JourneyModel[];

  contact: ContactModel;
  contacts: ContactModel[] = [];
  changement: ChangmentModel;
  changements: ChangmentModel [];


  private getDataObserver: any;
  public getData: any;

  private getDataObserver2: any;
  public getData2: any;


  constructor(private sqlite: SQLite) {

    this.getDataObserver = null;
    this.getData = Observable.create(observer => {
      this.getDataObserver = observer;
    });

    this.getDataObserver2 = null;
    this.getData2 = Observable.create(observer => {
      this.getDataObserver2 = observer;
    });

    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        db.executeSql('create table if not exists journey( id INTEGER PRIMARY KEY AUTOINCREMENT,id_depart VARCHAR(32),id_arrivee VARCHAR(32),name_depart VARCHAR(32),name_arrivee VARCHAR(32),latitude_depart VARCHAR(32),latitude_arrivee VARCHAR(32),longitude_depart VARCHAR(32),longitude_arrivee VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        db.executeSql('create table if not exists contact( id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(32),phoneNumber VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        db.executeSql('create table if not exists changements( id INTEGER PRIMARY KEY AUTOINCREMENT,name_from,name_to VARCHAR(32),departure_date_time VARCHAR(32),arrival_date_time VARCHAR(32),duration INT)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  getJourney(): Observable <JourneyModel []> {

    let result: Observable<JourneyModel[]> =  Observable.create(observer => {
      observer.next(this.journeys);
    });
    return result;
  }

  public getDataBaseJourney(){
    this.journeys = [];
    console.log('get data base');

    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('select * from journey', {})
          .then(val => {
            console.log('Executed SQL3');

            for(var i=0; i<val.rows.length; i++) {
              this.journey = new JourneyModel(val.rows.item(i).id,new GareModel(val.rows.item(i).id_depart,val.rows.item(i).name_depart,val.rows.item(i).latitude_depart,val.rows.item(i).longitude_depart,0),new GareModel(val.rows.item(i).id_arrivee,val.rows.item(i).name_arrivee,val.rows.item(i).latitude_arrivee,val.rows.item(i).longitude_arrivee,0));
              this.journeys.push(this.journey);
            }

            this.getDataObserver.next();

          }) ;
      })
      .catch(e => console.log(e));

    for(let entry of this.journeys){
      console.log('sqlite depart'+entry.gare_depart.name);
      console.log('sqlite arrivee'+entry.gare_arrivee.name);
    }
  }



  getContact(): Observable <ContactModel []> {

    this.contacts = [];



    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('select * from contact', {})
          .then(val => {
            console.log('Executed SQL3');
            for(var i=0; i<val.rows.length; i++) {


              this.contact = new ContactModel(val.rows.item(i).id,val.rows.item(i).name,val.rows.item(i).phoneNumber);
              console.log('phone number =',val.rows.item(i).phoneNumber)
              this.contacts.push(this.contact);

            }

          }) ;



      })
      .catch(e => console.log(e));

    let result: Observable<ContactModel[]> =  Observable.create(observer => {
      observer.next(this.contacts);
    });
    return result;


  }




  createJourney(gare_depart: GareModel,gare_arrivee: GareModel){

    console.log(gare_depart.name);


    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {




        db.executeSql('insert into  journey(id_depart,id_arrivee,name_depart ,name_arrivee ,latitude_depart ,latitude_arrivee ,longitude_depart ,longitude_arrivee ) VALUES(?,?,?,?,?,?,?,?)', [gare_depart.stop_id,gare_arrivee.stop_id,gare_depart.name,gare_arrivee.name,gare_depart.stop_lat,gare_arrivee.stop_lat,gare_depart.stop_lon,gare_arrivee.stop_lon])
          .then(() => console.log('Executed SQL2'))
          .catch(e => console.log(e));







      })
      .catch(e => console.log(e));



  }


  deleteContact(id: number){


    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {




        db.executeSql("DELETE FROM contact WHERE id = '"+id+"'",{})
          .then(() => console.log('Executed SQL2'))
          .catch(e => console.log(e));







      })
      .catch(e => console.log(e));



  }


  deleteJourney(id: number){
    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {




        db.executeSql("DELETE FROM journey WHERE id = '"+id+"'",{})
          .then(() => console.log('Executed SQL2'))
          .catch(e => console.log(e));







      })
      .catch(e => console.log(e));
  }


  deleteChangements(id: number){
    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {




        db.executeSql("DELETE FROM changements WHERE id = '"+id+"'",{})
          .then(() => console.log('Executed SQL2'))
          .catch(e => console.log(e));







      })
      .catch(e => console.log(e));
  }







  createContact(name: string,phoneNumber: string){


    console.log("createeeeeeeeeeeeeeeeeeeeeeeeeeeeeee phone number"+phoneNumber);
    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('insert into  contact(name,phoneNumber) VALUES(?,?)', [name,phoneNumber])
          .then(() => console.log('Executed SQL2'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

  }



  public getDataBaseChangements(){
    this.changements = [];
    console.log('get data base changement');

    this.sqlite.create({
      name: 'data_traintrain.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('select * from changements', {})
          .then(val => {
            console.log('Executed SQL3');

            for(var i=0; i<val.rows.length; i++) {
             /* this.journey = new JourneyModel(val.rows.item(i).id,new GareModel(val.rows.item(i).id_depart,val.rows.item(i).name_depart,val.rows.item(i).latitude_depart,val.rows.item(i).longitude_depart,0),new GareModel(val.rows.item(i).id_arrivee,val.rows.item(i).name_arrivee,val.rows.item(i).latitude_arrivee,val.rows.item(i).longitude_arrivee,0));
              this.journeys.push(this.journey);*/


             this.changement = new ChangmentModel(val.rows.item(i).id,val.rows.item(i).name_from,val.rows.item(i).name_to,val.rows.item(i).departure_date_time,val.rows.item(i).arrival_date_time,val.rows.item(i).duration);
             this.changements.push(this.changement);
            }

            console.log('observerrrrr');

            this.getDataObserver2.next();

          }) ;
      })
      .catch(e => console.log(e));


  }



  getChangments(): Observable <ChangmentModel []> {






    let result: Observable<ChangmentModel[]> =  Observable.create(observer => {
      observer.next(this.changements);
    });
    return result;


  }

  //id INTEGER PRIMARY KEY AUTOINCREMENT,name_from,name_to VARCHAR(32),departure_date_time VARCHAR(32),arrival_date_time VARCHAR(32),duration INT

  createChangements(sections: any){

    console.log('looooooooooooooooooooooooooooooooooooooool');


    for(let entry of sections){
      console.log("entry sections= "+entry.from.stop_point.name);
      console.log("entry sections= "+entry.departure_date_time);
      console.log("entry sections= "+entry.arrival_date_time);
      console.log("entry sections= "+entry.to.stop_point.name);
      console.log("entry sections= "+entry.duration);

      this.sqlite.create({
        name: 'data_traintrain.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('insert into  changements(name_from,name_to,departure_date_time,arrival_date_time,duration) VALUES(?,?,?,?,?)', [entry.from.stop_point.name,entry.to.stop_point.name,entry.departure_date_time,entry.arrival_date_time,entry.duration])
            .then(() => console.log('Executed SQL2'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }








  }




}
