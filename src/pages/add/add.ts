import {Component, OnInit, ViewChild} from "@angular/core";
import {AlertController, NavController, ViewController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ContactModel} from "../../Entity/ContactModel";
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

  form: FormGroup;
  urlImg: String;
  contact: ContactModel;


  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, private alertCtrl: AlertController, public sqliteService: SqliteService) {

    this.form = formBuilder.group({

      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.urlImg = '';
    // this.user = new User('assets/imgs/affiche.png','Max');
    // this.card = new RepoModel(this.user,'','','','','',0,0);
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ngOnInit() {
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    } else {
      console.log(this.form.value.name);
      this.sqliteService.createContact(this.form.value.name, this.form.value.phone);
      let alert = this.alertCtrl.create({
        title: 'Nouveau contact!',
        message: 'Contact '+ this.form.value.name+' bien ajouté!',
        buttons: [ {
          text: 'OK',
          handler: data => {
            this.navCtrl.setRoot(ShowPage, {}, {animate:true, direction: 'forward'});          }
        }]
      });
      alert.present();

    }

  }

}
