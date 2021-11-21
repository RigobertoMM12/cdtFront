import { Injectable } from '@angular/core';
import { Notificacion } from '../notificacionmdv/notificacion';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 notificacion:Notificacion
 crear:boolean;
 isDetails:boolean;
  constructor() { }
}
