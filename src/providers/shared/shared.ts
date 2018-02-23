import { Injectable } from '@angular/core';
import {GareModel} from "../../entity/GareModel";

/*
  Generated class for the SharedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedProvider {

  station: GareModel = null;
  constructor() {

  }

}
