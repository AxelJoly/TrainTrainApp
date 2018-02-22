import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeolocalisationPage } from './geolocalisation';

@NgModule({
  declarations: [
    GeolocalisationPage,
  ],
  imports: [
    IonicPageModule.forChild(GeolocalisationPage),
  ],
})
export class GeolocalisationPageModule {}
