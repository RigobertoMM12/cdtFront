import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { RroductoService } from './producto.service';
import { ProductoModel } from './model/ProductoModel';
import { DataProductService } from '../services/dataProduct.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productoModelSelect: ProductoModel = new ProductoModel();
  loading: boolean = false;

  constructor(private productoService: RroductoService,
    private dataService: DataProductService,private router: Router) { }
  private paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1
  };

  config: any;

  collection = { count: 60, data: [] };
  productos: ProductoModel[];

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    console.log("-------------------***");
    this.productos = [];
    this.loading = true;
    this.collection = { count: 60, data: [] };
    this.productoService.getProducts().subscribe(
      resp => {
        if (resp.length > 0) {
          resp.forEach(element => {
            this.collection.data.push(element)
          });
          this.productos = resp;
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
  editProduct(sku: string) {
    console.log(" this.idProdu : " + sku)
    var productos = this.productos.filter(e => {
      return e.sku == sku
    })

    if (productos.length > 0) {
      this.productoModelSelect = productos[0];
      this.dataService.productoM = this.productoModelSelect;
      this.dataService.crear = false;
      console.log(" this.productoModelSelec : " + this.productoModelSelect.descripcion)
    }

  }

  deleteProduct(sku: string) {
    console.log(" this.idProdu : " + sku)
    var productos = this.productos.filter(e => {
      return e.sku == sku
    })


    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Producto ${productos[0].sku} - ${productos[0].descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.productoService.deleteProducts(productos[0].id).subscribe(
          resp => {
            if(resp == null){



              Swal.fire('Producto eliminado', `El producto ha sido eliminado con éxito`, 'success').then((result)=>{
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

  }

}
