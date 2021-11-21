import { Injectable } from '@angular/core';
import { PlazoModel } from '../plazo/models/PlazoModel';
@Injectable({
  providedIn: 'root'
})
export class DataPlazoService {
 plazoS:PlazoModel;
 crear:boolean;
  constructor() { }
}
