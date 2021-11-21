import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from '../model/ProductoModel';
import { RroductoService } from '../producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { DataProductService } from 'src/app/services/dataProduct.service';
import { UserService } from 'src/app/header/UserService';
import { UsuariocModel } from 'src/app/header/model/UsuariocModel';

@Component({
  selector: 'app-form',
  templateUrl: './formModifica.component.html',
  styleUrls: ['./../productos.component.css']

})
export class FormModificaComponent implements OnInit {
  @Input() valor: number = 600;
  loading = false;
   productoModel: ProductoModel = new ProductoModel();
   isDetails:boolean =false;

  titulo: string = "Crear Producto";
  errores: string[];
  nvalo: string[];
  today = new Date()
  minDate = { year: 2010, month: 5, day: 25 };
  constructor(private productoService: RroductoService,
    private userService:UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,private datService:DataProductService) { }
    public habilitabtn:boolean =true;
     ffechaInicio: { day: number, year: number, month: number };
  ffechaFin: { day: number, year: number, month: number };
  ngOnInit() {
    this.today.setDate(this.today.getDate() - 0);
    this.minDate = { year: this.today.getFullYear(), month: (this.today.getMonth() + 1), day: this.today.getDate()  };
    this.cargarProduct();
  }

  cargarProduct(): void {
    this.habilitabtn = this.datService.crear;
    if(!this.habilitabtn){
      this.titulo="Editar Producto"
    }


 try{
  this.productoModel  = this.datService.productoM;




  if( this.productoModel == null){
    this.productoModel = new ProductoModel();

  }else{


  }

 }catch(w){
  this.router.navigate(['productos']);
  console.log("catch ==> ",w);

 }
  }




  create(): void {
    this.loading = true;
    console.log("notifiacion: ",this.productoModel)
    var usrActivo: UsuariocModel = this.userService.getUserLoggedIn();

    this.productoModel.idUsuario  =usrActivo.id;
    this.productoService.createUpdateProduct(JSON.stringify(this.productoModel))
      .subscribe(
        cliente => {
          this.loading = false;
          this.router.navigate(['productos']);
          swal.fire('Nuevo Producto', `El producto ha sido creado con éxito`, 'success');
        },
        err => {
          swal.fire('Nuevo Producto', `Ocurrio un error al crear el producto`, 'error');
          this.loading = false;
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status+ err.error);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    console.log("-.-.-.-.-.-.- "+this.productoModel)
    this.loading = true;
    this.productoService.createUpdateProduct(JSON.stringify(this.productoModel))
      .subscribe(
        json => {
          this.router.navigate(['productos']);
          swal.fire('Producto Actualizado', `${json.descripcion}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }


regresar():void{
  this.router.navigate(['productos']);
 }

}
