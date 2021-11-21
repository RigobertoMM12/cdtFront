import { Component, OnInit, Input } from '@angular/core';
import { PlazoModel } from '../models/PlazoModel';
import { PlazoService } from '../plazo.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { DataPlazoService } from 'src/app/services/dataPlazo.service';
import { UserService } from 'src/app/header/UserService';
import { UsuariocModel } from 'src/app/header/model/UsuariocModel';
import { ListaProductModel } from '../models/ListaProductModel';
import { RroductoService } from 'src/app/productos/producto.service';
import { ListaPeriodosModel } from '../models/ListaPeriodosModel';
@Component({
  selector: 'app-form',
  templateUrl: './formPlazo.component.html',
  styleUrls: ['./../plazo.component.css']

})
export class FormPlazoComponent implements OnInit {
  @Input() valor: number = 600;
  loading = false;
   plazoModel: PlazoModel = new PlazoModel();
   isDetails:boolean =false;

  titulo: string = "Crear Plazo";
  errores: string[];
  nvalo: string[];
  listaProduct : ListaProductModel[]=[{id:0,descripcion:"Seleciona el producto"}];
  listaPeriodo : ListaPeriodosModel[]=[{id:0,descripcion:"Seleciona el perido"},{id:1,descripcion:"Semanal"},{id:2,descripcion:"Quincenal"}];

  today = new Date()
  minDate = { year: 2010, month: 5, day: 25 };
  constructor(private plazoService: PlazoService,
    private userService:UserService,
    private router: Router,
    private productoService:RroductoService,
    private activatedRoute: ActivatedRoute,private datService:DataPlazoService) { }
    public habilitabtn:boolean =true;
     ffechaInicio: { day: number, year: number, month: number };
  ffechaFin: { day: number, year: number, month: number };
  ngOnInit() {
    this.today.setDate(this.today.getDate() - 0);
    this.minDate = { year: this.today.getFullYear(), month: (this.today.getMonth() + 1), day: this.today.getDate()  };
    this.cargarProduct();
    this.cargarPlazo();
  }

  cargarProduct(): void {
    this.productoService.getProducts().subscribe(
      resp => {
        if (resp.length > 0) {
          resp.forEach(element => {
            var producto:ListaProductModel = new ListaProductModel();
            producto.id= element.id;
            producto.descripcion = element.descripcion
            this.listaProduct.push(producto)
          });
        }
        this.loading = false
      }, err => {
        this.loading = false;
        console.log("loadData()=> ", err)
      })
  }
  cargarPlazo(): void {
    this.habilitabtn = this.datService.crear;
    if(!this.habilitabtn){
      this.titulo="Editar Plazo"
    }
    try
    {
      this.plazoModel  = this.datService.plazoS;
      if( this.plazoModel == null){
        this.plazoModel = new PlazoModel();
        this.plazoModel.productoId=0;
      }
    }catch(w){
      this.router.navigate(['plazo']);
      console.log("catch ==> ",w);

    }
  }




  create(): void {
    this.loading = true;
    var usrActivo: UsuariocModel = this.userService.getUserLoggedIn();

    this.plazoModel.usuarioId  =usrActivo.id;
    this.plazoService.createUpdatePlazo(JSON.stringify(this.plazoModel))
      .subscribe(
        cliente => {
          this.loading = false;
          this.router.navigate(['plazo']);
          swal.fire('Nuevo Plazo', `El plazo ha sido creado con éxito`, 'success');
        },
        err => {
          swal.fire('Nuevo Plazo', `Ocurrio un error al crear el plazo`, 'error');
          this.loading = false;
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status+ err.error);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    console.log("-.-.-.-.-.-.- "+this.plazoModel)
    this.loading = true;
    this.plazoService.createUpdatePlazo(JSON.stringify(this.plazoModel))
      .subscribe(
        json => {
          this.router.navigate(['plazo']);
          swal.fire('Plazo Actualizado', `con exito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }


regresar():void{
  this.router.navigate(['plazo']);
 }

}
