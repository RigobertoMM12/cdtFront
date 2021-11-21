import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, from, of } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class RroductoService {
  private urlgetProductos: string = environment.apiUrlC+ 'producto/';
  private urlCreateUpdateProduct: string = environment.apiUrlC+ 'producto/';
  private urlDeleteProduct: string = environment.apiUrlC+ 'producto/delete/';
  private urlProductById: string = environment.apiUrlC+ 'producto/byId/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }
  getProductsById(id): Observable<any> {
    return this.http.get(this.urlProductById+id, { headers: this.httpHeaders }).pipe(
      map(response => {
        let notSore: any = response;
        //let datosEmpleado = notSore.dato as UsuarioModel;
        return notSore;
      }
      ), catchError(e => {
        console.log("catchError()-->", e)
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.status == 0) {
          swal.fire("Servicio no disponible", e.error.error, 'error');
          return throwError(e);
        }


        return throwError(e);
      })
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(this.urlgetProductos, { headers: this.httpHeaders }).pipe(
      map(response => {
        let notSore: any = response;
        //let datosEmpleado = notSore.dato as UsuarioModel;
        return notSore;
      }
      ), catchError(e => {
        console.log("catchError()-->", e)
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.status == 0) {
          swal.fire("Servicio no disponible", e.error.error, 'error');
          return throwError(e);
        }


        return throwError(e);
      })
    );
  }

 deleteProducts(idProducto:number): Observable<any> {
    return this.http.delete(this.urlDeleteProduct+idProducto, { headers: this.httpHeaders }).pipe(
      map(response => {
        let notSore: any = response;
        //let datosEmpleado = notSore.dato as UsuarioModel;
        return notSore;
      }
      ), catchError(e => {
        console.log("catchError()-->", e)
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.status == 0) {
          swal.fire("Servicio no disponible", e.error.error, 'error');
          return throwError(e);
        }


        return throwError(e);
      })
    );
  }

  createUpdateProduct(peticion:string): Observable<any> {
    return this.http.post(this.urlCreateUpdateProduct, peticion, { headers: this.httpHeaders }).pipe(
      map(response => {
        return response;
      }
      ),catchError(e => {
        console.log("catchError()-->",e)
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.status == 0) {
          swal.fire("Servicio no disponible", e.error.error, 'error');
          return throwError(e);
        }


        return throwError(e);
      })
    );
  }

}
