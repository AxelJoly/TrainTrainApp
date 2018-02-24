import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, NavController, ViewController} from "ionic-angular";
import { Contacts} from "@ionic-native/contacts";
import {ContactModel} from "../../entity/ContactModel";
import {ContactShowModel} from "../../entity/ContactShowModel";
import {SqliteService} from "../../providers/sqlite/SqliteService";
import {ShowPage} from "../show/show";
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage implements OnInit {

  contacteu: ContactShowModel[] = [];



  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private alertCtrl: AlertController, private contacts: Contacts,public sqliteService:SqliteService) {



  }

  ngOnInit() {

    this.contacts.find(['displayName', 'name', 'phoneNumbers', 'emails'],{filter: "", multiple: true}).then(val=>{

      for(let entry of val){
        let contact = new ContactShowModel('',[]);

        if(entry.phoneNumbers){
          console.log(entry.displayName);
          contact.name = entry.displayName;
          for(let phone of entry.phoneNumbers){
            console.log(phone.value);
            contact.phone.push(phone.value);
          }
          this.contacteu.push(contact);
        }

      }
    });
  }


  done(name,phone) {

    console.log(name);
    this.sqliteService.createContact(name, phone);
    let alert = this.alertCtrl.create({
      title: 'Nouveau contact!',
      message: 'Contact '+ name+' bien ajouté!',
      buttons: [ {
        text: 'OK',
        handler: data => {
          this.navCtrl.setRoot(ShowPage, {}, {animate:true, direction: 'forward'});          }
      }]
    });
    alert.present();
  }
}
