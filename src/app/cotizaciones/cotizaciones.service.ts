import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, from, of } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class CotizacionesService {
  private urlgetCotizacion: string = environment.apiUrlC+ 'cotizacion/';
  private urlgetCotizacionByProduct: string = environment.apiUrlC+ 'cotizacion/byProducto/';
  private urlCreateUpdateCotizacion: string = environment.apiUrlC+ 'cotizacion/';
  private urlDeleteProduct: string = environment.apiUrlC+ 'cotizacion/delete/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getCotizacion(): Observable<any> {
    return this.http.get(this.urlgetCotizacion, { headers: this.httpHeaders }).pipe(
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
  getPlazosbyProduct(idProduct:number): Observable<any> {
    return this.http.get(this.urlgetCotizacionByProduct+idProduct, { headers: this.httpHeaders }).pipe(
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

 deleteCotizacion(idPlazo:number): Observable<any> {

    return this.http.delete(this.urlDeleteProduct+idPlazo, { headers: this.httpHeaders }).pipe(
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


  createUpdateCotizacion(peticion:string): Observable<any> {
    return this.http.post(this.urlCreateUpdateCotizacion, peticion, { headers: this.httpHeaders }).pipe(
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
