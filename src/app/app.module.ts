import { DetailsPage } from './../pages/details/details';
import { FavorisPage } from './../pages/favoris/favoris';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {DataProvider} from "../providers/data/data";
import {HttpClientModule} from "@angular/common/http";
import {SncfProvider} from "../providers/sncf/sncf";
import { AutoCompleteModule } from 'ionic2-auto-complete';
import {  CompleteTestService } from '../providers/complete-test-service/complete-test-service';
import {HttpModule} from "@angular/http";
import {TrajetsPage} from "../pages/trajets/trajets";
import {SqliteService} from "../providers/sqlite/SqliteService";
import {SQLite} from "@ionic-native/sqlite";
import { ResultsPage } from '../pages/results/results';
import {ProgressBarModule} from "angular-progress-bar";
import { Geolocation } from '@ionic-native/geolocation';
import {GeolocalisationPage} from "../pages/geolocalisation/geolocalisation";
import { SharedProvider } from '../providers/shared/shared';
import {AddPage} from "../pages/add/add";
import {ShowPage} from "../pages/show/show";
import {SMS} from "@ionic-native/sms";
import {SocialSharing} from "@ionic-native/social-sharing";
import {DatePipe} from "@angular/common";



@NgModule({
  declarations: [
    MyApp,
    TrajetsPage,
    FavorisPage,
    ResultsPage,
    DetailsPage,
    GeolocalisationPage,
    AddPage,
    ShowPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AutoCompleteModule,
    HttpModule,
    ProgressBarModule,
    IonicPageModule.forChild(GeolocalisationPage),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TrajetsPage,
    FavorisPage,
    ResultsPage,
    DetailsPage,
    GeolocalisationPage,
    AddPage,
    ShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    SncfProvider,
    CompleteTestService,
    SqliteService,
    SQLite,
    Geolocation,
    SharedProvider,
    SMS,
    SocialSharing,
    DatePipe,


    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedProvider,

  ],
})
export class AppModule {}
