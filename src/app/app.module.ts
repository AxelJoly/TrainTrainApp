import { FavorisPage } from './../pages/favoris/favoris';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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

@NgModule({
  declarations: [
    MyApp,
    TrajetsPage,
    FavorisPage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AutoCompleteModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TrajetsPage,
    FavorisPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    SncfProvider,
    CompleteTestService,
    SqliteService,
    SQLite,

    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ],
})
export class AppModule {}
