import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { PlazoService } from '../plazo/plazo.service';
import { CotizacionModel } from './model/CotizacionModel';

import { DataPlazoService } from '../services/dataPlazo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RroductoService } from '../productos/producto.service';
import { ProductoModel } from '../productos/model/ProductoModel';
import { CotizacionesService } from '../cotizaciones/cotizaciones.service';
import { PlazoModel } from '../plazo/models/PlazoModel';

@Component({
  selector: 'app-ccotizaciones',
  templateUrl: './ccotizaciones.component.html',
  styleUrls: ['./ccotizaciones.component.css']
})
export class CcotizacionesComponent implements OnInit {


  cotizacionModel: CotizacionModel = new CotizacionModel();
  loading: boolean = false;
  productos: ProductoModel[];
  plazos: PlazoModel[];

  constructor(private plazoService: PlazoService,
    private productoService:RroductoService,
    private dataService: DataPlazoService
    ,private router: Router,
    private cotizacionService:CotizacionesService) { }
  private paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1
  };

  config: any;

  collection = { count: 60, data: [] };
  cotizaciones: CotizacionModel[];

  ngOnInit(): void {

    this.loadProduct();
  }

  loadProduct(): void {
    console.log("-------------------***");
    this.productos = [];
    this.loading = true;
    this.productoService.getProducts().subscribe(
      resp => {
        if (resp.length > 0) {
          this.productos = resp;
          this.loadPlazo();
        }
        this.loading = false
      }, err => {
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }
  loadPlazo(): void {
    console.log("-------------------***");
    this.plazos = [];
    this.loading = true;
    this.plazoService.getPlazos().subscribe(
      resp => {
        if (resp.length > 0) {
          this.plazos = resp;
          this.loadData();
        }
        this.loading = false
      }, err => {
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }

  loadData(): void {
    console.log("-------------------***");
    this.cotizaciones = [];
    this.loading = true;
    this.collection = { count: 60, data: [] };
    this.cotizacionService.getCotizacion().subscribe(
      resp => {
        if (resp.length > 0) {
          resp.forEach(element => {
           this.descripcionProduct(element);

          });
          this.cotizaciones = resp;
        }

        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.collection.data.length
        };
        this.loading = false
      }, err => {
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }

  descripcionProduct(element:any){
console.log(element.id)
var producto = this.productos.filter(e => {
  return e.id == element.productoId
})
element.descripcion =producto[0].sku+" - "+producto[0].descripcion;
var plazo = this.plazos.filter(e => {
  return e.id == element.plazoId
})
element.numPlazo =plazo[0].numPlazo;
element.precio =producto[0].precio;
element.tasaNormal =plazo[0].tasaNormal;
element.tasaPuntual =plazo[0].tasaPuntual;
this.collection.data.push(element);

  }



}
