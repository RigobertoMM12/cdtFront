import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { PlazoService } from './plazo.service';
import { PlazoModel } from './models/PlazoModel';

import { DataPlazoService } from '../services/dataPlazo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RroductoService } from '../productos/producto.service';
@Component({
  selector: 'app-plazo',
  templateUrl: './plazo.component.html',
  styleUrls: ['./plazo.component.css']
})
export class PlazoComponent implements OnInit {

  plazoModel: PlazoModel = new PlazoModel();
  loading: boolean = false;

  constructor(private plazoService: PlazoService,private productoService:RroductoService,
    private dataService: DataPlazoService,private router: Router) { }
  private paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1
  };

  config: any;

  collection = { count: 60, data: [] };
  plazos: PlazoModel[];

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    console.log("-------------------***");
    this.plazos = [];
    this.loading = true;
    this.collection = { count: 60, data: [] };
    this.plazoService.getPlazos().subscribe(
      resp => {
        if (resp.length > 0) {
          resp.forEach(element => {
           this.descripcionProduct(element);

          });
          this.plazos = resp;
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

    this.productoService.getProductsById(element.productoId).subscribe(
      resp => {
        if (resp != null) {
          element.descripcion =resp.sku+" - "+resp.descripcion;
          this.collection.data.push(element)
        }else{
          this.collection.data.push(element)
        }
      }, err => {
        this.collection.data.push(element)
      })
  }
  editProduct(id: number) {
    var productos = this.plazos.filter(e => {
      return e.id == id
    })

    if (productos.length > 0) {
      this.plazoModel = productos[0];
      this.dataService.plazoS = this.plazoModel;
      this.dataService.crear = false;
    }

  }

  deleteProduct(id:  number) {
    console.log(" this.idProdu : " + id)
    var productos = this.plazos.filter(e => {
      return e.id == id
    })


    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el plazo ${productos[0].numPlazo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.plazoService.deletePlazo(productos[0].id).subscribe(
          resp => {
            if(resp == null){



              Swal.fire('Plazo eliminado', `El plazo ha sido eliminado con éxito`, 'success').then((result)=>{
                if (result) {
                  this.loadData()
                }
              });
            }
            this.loading = false
          }, err => {
            this.loading = false;
            console.log("loadData()=> ", err)
          })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          '',
          'error'
        )
      }
    })



  }
  createProduct() {
    this.dataService.crear = true;
    this.dataService.plazoS= new PlazoModel();
  }
}
