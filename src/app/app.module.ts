import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { LoggerModule } from 'ngx-logger';

import 'core-js/features/array/includes'
import '@angular/localize/init';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserService} from './header/UserService';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormModificaComponent } from './productos/modificar/FormModifica.Component';
import { FormPlazoComponent } from './plazo/formulario/FormPlazoComponent';

import { FormsModule } from '@angular/forms';
import { NgxLoadingModule , ngxLoadingAnimationTypes } from 'ngx-loading';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask'
import { from } from 'rxjs';

import { MyHeaderService } from './header/header.service';
import { Page404Component } from './page404/page404.component';
import { SinSeComponent } from './sin-se/sin-se.component';


import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { RroductoService } from './productos/producto.service';
import { PlazoService } from './plazo/plazo.service';
import { CotizacionesService } from './cotizaciones/cotizaciones.service';
import { PlazoComponent } from  './plazo/plazo.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { CcotizacionesComponent } from './ccotizaciones/ccotizaciones.component';
registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: 'productos/form', component: FormModificaComponent },
  { path: 'plazo/form', component: FormPlazoComponent },
  { path: '', component:  CotizacionesComponent},
  { path: 'sinSe', component:  SinSeComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'productos', component:  ProductosComponent},
  { path: 'plazo', component:  PlazoComponent},
  { path: 'cotizaciones', component:  CcotizacionesComponent},
  {
    path: '**',
    component:  Page404Component
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormModificaComponent,
    FormPlazoComponent,
    Page404Component,
    SinSeComponent,
    LoginComponent,
    ProductosComponent,
    PlazoComponent,
    CotizacionesComponent,
    CcotizacionesComponent
  ],
  imports: [
    BrowserModule,NgbModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.chasingDots,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#dc3545',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
  }),
  NgxMaskModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [MyHeaderService,UserService,RroductoService,PlazoService,CotizacionesService,
    { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }






