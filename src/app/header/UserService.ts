import { Injectable } from '@angular/core';
import { UsuariocModel } from './model/UsuariocModel';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public usserLogged:UsuariocModel;
  private secret = "MM2DGZBRORHHAQ2D";
  constructor() { 
  	this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:UsuariocModel) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
   
    localStorage.setItem('currentUser', JSON.stringify(user));
    //localStorage.setItem('currentUser',  CryptoJS.AES.encrypt(JSON.stringify(user), this.secret.trim()).toString());
  
  }

  getUserLoggedIn() {
  
   // return JSON.parse(  CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), this.secret.trim()).toString());
  	return JSON.parse(localStorage.getItem('currentUser'));
  }
  removeUserLoggedIn() {
    localStorage.removeItem("currentUser");
  
}

}