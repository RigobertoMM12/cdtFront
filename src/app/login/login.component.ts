import { Component, OnInit } from '@angular/core';
import { UserService } from '../header/UserService';
import Swal from 'sweetalert2';
import { UsuariocModel } from '../header/model/UsuariocModel';
import { Router } from '@angular/router';
import { MyHeaderService } from '../header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private headerService : MyHeaderService,private userService: UserService,private router: Router) { }

  psw: string = "";
  uname: string;
  usrActivo : UsuariocModel = new UsuariocModel();;
  ngOnInit(): void {
  }
 clickLogin() {
   if(this.psw == "" || this.psw == undefined ){
    Swal.fire('Advertencia', `Contraseña es necesaria`, 'error');
   }else  if(this.uname == "" || this.uname == undefined ){
    Swal.fire('Advertencia', `Usuario es necesario`, 'error');
   }else{
     var peticion = "/"+this.uname+"/"+this.psw;

    this.headerService.starSessionN(peticion).subscribe(
      usr => {
        if(usr == null){
          Swal.fire('Advertencia', `Usuario o Contraseña incorrecta`, 'error');
        }else{
          this.usrActivo = usr;
          console.log("loadData()=> "+this.usrActivo);
          this.userService.setUserLoggedIn(this.usrActivo);
          this.router.navigate(['productos']);

        }

      }, err => {
       // this.loading = false;
        console.log("loadData()=> ", err)
      },
      () => this.navigate()
    );

   }

  }
  navigate() {

  }

}
