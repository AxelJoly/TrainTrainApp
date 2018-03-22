import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {ContactModel} from "../../Entity/ContactModel";
import {Observable} from "rxjs/Observable";
import {SqliteService} from "../../providers/sqlite/SqliteService";

@Component({
  selector: 'page-show',
  templateUrl: 'show.html'
})
export class ShowPage implements OnInit {

  contacts: ContactModel[];
  private getDataObserver: any;
  public getData2: any;

  constructor(public navCtrl: NavController,public sqliteService: SqliteService) {

    this.getDataObserver = null;
    this.getData2 = Observable.create(observer => {
      this.getDataObserver = observer;


    });
    console.log("show contact");

  }
  ngOnInit(){

    this.getContact();
    this.getData2.subscribe(()=>{
      this.getContact();
    })

  }

  public getContact(){

    console.log("getcontact");


    this.sqliteService.getContact().subscribe(val=>{

      console.log("get contacteuuuuuuu");

      this.contacts = val;
      
    });
  }

  public delete(id: number){

    this.sqliteService.deleteContact(id);
    this.getDataObserver.next();
  }

}
