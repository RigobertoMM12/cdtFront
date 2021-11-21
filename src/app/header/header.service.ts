import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariocModel } from './model/UsuariocModel';
import { Observable, throwError, timer, Subject } from 'rxjs';
import { map, catchError, shareReplay, timeout } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { valorReloj } from './model/valorReloj';

@Injectable()
export class MyHeaderService {


  private urlAuthenticate: string = environment.apiUrlC + 'usuarios/authenticate';



  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
  constructor(private http: HttpClient, private router: Router) {
  }

  starSessionN(peticion: string): Observable<any> {
    return this.http.get(this.urlAuthenticate+peticion, { headers: this.httpHeaders }).pipe(
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
          Swal.fire("Servicio no disponible", e.error.error, 'error');
          return throwError(e);
        }


        return throwError(e);
      })
    );
  }




}
