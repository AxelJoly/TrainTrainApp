import {GareModel} from "./GareModel";

export class JourneyModel{

  constructor(public id: number,public gare_depart: GareModel,public gare_arrivee: GareModel){

  }
}
