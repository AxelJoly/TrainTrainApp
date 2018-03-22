import { FavorisPage } from './../pages/favoris/favoris';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TrajetsPage} from "../pages/trajets/trajets";
import {AddPage} from "../pages/add/add";
import {ShowPage} from "../pages/show/show";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TrajetsPage;

  pages: Array<{title: string,icon:string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Recherche Trajet',icon:'md-train', component: TrajetsPage},
      { title: 'Favoris',icon:'md-star', component: FavorisPage},
      { title: 'Ajout contact',icon:'md-person-add', component: AddPage},
      { title: 'Recherche Contact',icon:'md-contact', component: ShowPage},


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


