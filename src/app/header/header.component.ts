import { Component } from '@angular/core';
import { UsuariocModel } from './model/UsuariocModel';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './UserService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  loading = false;
  usrActivo: UsuariocModel = new UsuariocModel();
  existeSession: boolean = false;
  timeOut: any;
  noEmpleado = 0;
  constructor( private router: Router, private userService: UserService, private location: Location) { }
  ngOnInit(): void {
    this.loadData();
  }
  closeSession(): void {
    this.userService.removeUserLoggedIn();
        this.existeSession = false;
        this.loading = false;
        this.router.navigate(['/login']);

  }
  loadData(): void {
    var mmm = this.userService.getUserLoggedIn();
    if (mmm != null) {
      if (mmm.idPerfil == 0) {
        this.userService.setUserLoggedIn(null)
      }
    }
    this.loading = false;
    if (this.userService.getUserLoggedIn() == null) {
      this.router.navigate(['login']);
    }else {
      this.existeSession = true;
      this.usrActivo = this.userService.getUserLoggedIn();

      switch (location.pathname) {
        case "/":
        case "/CanaLesCotizacion/":

          this.router.navigate(['']);
          break;
      }
    }

  }
  navegatior(): string {
    var navegador = navigator.userAgent;
    var msie = navegador.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return "INTERNET EXPLORER";
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      return "MOZILA FIREFOX";
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      return "GOOGLE CHROME";
    } else if (navigator.userAgent.indexOf('Opera') != -1) {
      return "OPERA";
    } else {
      return "OTRO";
    }
  }


}
