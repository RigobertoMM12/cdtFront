import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
//import { PlazoService } from './plazo.service';
import { PlazoModel } from '../plazo/models/PlazoModel';

import { DataPlazoService } from '../services/dataPlazo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RroductoService } from '../productos/producto.service';
import { ListaTipoCotizacion } from './models/ListaTipoCotizacion';
import { PlazoService } from '../plazo/plazo.service';
import { ProductoModel } from '../productos/model/ProductoModel';
import { UsuariocModel } from '../header/model/UsuariocModel';
import { UserService } from 'src/app/header/UserService';
import { CotizacionesService } from './cotizaciones.service';
import { RequesCotizacion } from './models/RequesCotizacion';
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  loading: boolean = false;

  tipoCotizacion:number = 1;
  skuSelect:String="";
  descSelec:string ="";
  listaPlazos:PlazoModel []=[]
  productos: ProductoModel[];
  idPlazoSelect:number;
  numPlazoSelect:number;
  tasaNormal : number;
  tasaPuntual  :number;
  showThwo  = false;
  productoSelect: ProductoModel= new ProductoModel();
  plazoSelect  : PlazoModel  = new PlazoModel();
  tipoCotizaciones :  ListaTipoCotizacion [] =[{id:1, descripcion:"Por SKU"},{id:2, descripcion:"Por Descripcion de producto"}];
  ngOnInit(): void {
    this.loadProduct();
  }
  constructor(
    private plazoService:PlazoService,
    private productoService:RroductoService,
    private userService:UserService,
    private cotizacionesService:CotizacionesService) { }



  loadProduct(): void {
    console.log("-------------------***");
    this.productos = [];
    this.loading = true;
    this.productoService.getProducts().subscribe(
      resp => {
        if (resp.length > 0) {
          this.productos = resp;
        }
        this.loading = false
      }, err => {
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }
  selectPlazo(id:number): void{
    var plazoSel  = this.listaPlazos.filter(plazo =>{
      return plazo.id ==id;
  });
  this.plazoSelect  = plazoSel[0];

  this.tasaNormal  = Number.parseFloat((((this.productoSelect.precio * this.plazoSelect.tasaNormal ) + this.productoSelect.precio)
  / this.plazoSelect.numPlazo).toFixed(2));

  this.tasaPuntual  = Number.parseFloat((((this.productoSelect.precio * this.plazoSelect.tasaPuntual ) + this.productoSelect.precio)
  / this.plazoSelect.numPlazo).toFixed(2));

  }
limpirCotizacion(){
  this.listaPlazos  = [];
  this.idPlazoSelect=0;
  this.plazoSelect = new PlazoModel();
  this.tasaNormal =0;
  this.tasaPuntual  = 0;


}
buscarPlazos(){
  if(this.tipoCotizacion == 1){
    this.buscarPlazobySku()
  }else{
    this.buscarPlazobyDesc();
  }
}
  buscarPlazobySku(){
  this.limpirCotizacion();
      console.log(this.skuSelect);
      var productoSel  = this.productos.filter(producto =>{
          return producto.sku ==this.skuSelect;
      });
      if(productoSel.length==1){
        this.showThwo  = true;
        this.loading = true;
        this.productoSelect =  productoSel[0];
        this.consultarPlazo(this.productoSelect.id)
      }else{
        this.showThwo  = false;
        this.productoSelect = new ProductoModel();

        Swal.fire('Sku no encontrado', `No se encuentra el sku`, 'warning')
      }
      console.log(productoSel)

  }
  buscarPlazobyDesc(){
    this.limpirCotizacion();
        console.log(this.descSelec);
        var productoSel  = this.productos.filter(producto =>{
            return producto.descripcion ==this.descSelec;
        });
        if(productoSel.length==1){
          this.showThwo  = true;
          this.loading = true;
          this.productoSelect =  productoSel[0];
          this.consultarPlazo(this.productoSelect.id)
        }else{
          this.showThwo  = false;
          this.productoSelect = new ProductoModel();

          Swal.fire('Aviso', `No se encuentra el produto`, 'warning')
        }
        console.log(productoSel)

    }


  consultarPlazo(id){
    this.plazoService.getPlazosbyProduct(id).subscribe(
      resp => {
        if (resp.length > 0) {
          resp.forEach(element => {
            this.listaPlazos.push(element)
          });
        }


        this.loading = false
      }, err => {
        this.showThwo  = false;
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }
  generarCotizacion():void{
    var usrActivo: UsuariocModel = this.userService.getUserLoggedIn();
    var cotizacio:RequesCotizacion  =  {
      "plazoId": this.plazoSelect.id,
      "usuarioId": usrActivo.id,
      "abonoNormal": this.tasaNormal,
      "nombreCotizacion": '',
      "abonoPuntual": this.tasaPuntual,
      "productoId":this.productoSelect.id
    }
    this.loading = true;
    this.cotizacionesService.createUpdateCotizacion(JSON.stringify(cotizacio))
      .subscribe(
        cotizacion => {
          this.loading = false;
          this.limpirCotizacion();
          this.productoSelect  = new ProductoModel();
          Swal.fire('Cotizacion', `La cotizacion `+cotizacion.id+` ha sido creado con éxito`, 'success');
        },
        err => {
          Swal.fire('Cotizacion', `Ocurrio un error al crear la cotizacion`, 'error');
          this.loading = false;
          console.error('Código del error desde el backend: ' + err.status+ err.error);
          console.error(err.error.errors);
        }
      );
  }
}
