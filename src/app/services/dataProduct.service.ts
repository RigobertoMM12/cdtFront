import { Injectable } from '@angular/core';
import { ProductoModel } from '../productos/model/ProductoModel'; 
@Injectable({
  providedIn: 'root'
})
export class DataProductService {
 productoM:ProductoModel;
 crear:boolean;
 isDetails:boolean;
  constructor() { }
}
