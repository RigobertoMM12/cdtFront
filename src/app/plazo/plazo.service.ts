import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, from, of } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class PlazoService {
  private urlgetPlazos: string = environment.apiUrlC+ 'plazo/';
  private urlgetPlazosByProduct: string = environment.apiUrlC+ 'plazo/byProducto/';
  private urlCreateUpdatePlazo: string = environment.apiUrlC+ 'plazo/';
  private urlDeleteProduct: string = environment.apiUrlC+ 'plazo/delete/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getPlazos(): Observable<any> {
    return this.http.get(this.urlgetPlazos, { headers: this.httpHeaders }).pipe(
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
    return this.http.get(this.urlgetPlazosByProduct+idProduct, { headers: this.httpHeaders }).pipe(
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

 deletePlazo(idPlazo:number): Observable<any> {

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


  createUpdatePlazo(peticion:string): Observable<any> {
    return this.http.post(this.urlCreateUpdatePlazo, peticion, { headers: this.httpHeaders }).pipe(
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
