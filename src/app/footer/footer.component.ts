import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../header/UserService';
import { UsuarioModel } from '../header/model/usuarioModel';

@Component({
selector: 'app-footer',
templateUrl: './footer.component.html',
styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit{
  usrActivo: UsuarioModel = new UsuarioModel();
  tittleBotton: string = "";
  loading:boolean = false;
  isbad: boolean = false;
  valueCierre: string = "";
  public autor: any = {nombre:'', apellido: '2021',version:environment.version};
  constructor(private userService: UserService ) { }
  ngAfterViewInit() {
    this.usrActivo = this.userService.getUserLoggedIn();
    if(  this.usrActivo != null){
      console.log("Despues de iniciar ",this.usrActivo);

    }else{
      console.log("Despues de iniciar NOOOOOOOOOOOOOOOOOOOOOOOOO")
    }

  }



  navegatior():string
  {
    var navegador = navigator.userAgent;
    var msie = navegador.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
      return "INTERNET EXPLORER";
    } else if (navigator.userAgent.indexOf('Firefox') !=-1)
    {
      return "MOZILA FIREFOX";
    } else if (navigator.userAgent.indexOf('Chrome') !=-1)
    {
      return "GOOGLE CHROME";
    } else if (navigator.userAgent.indexOf('Opera') !=-1)
    {
      return "OPERA";
    } else
    {
      return "OTRO";
    }
  }

}
