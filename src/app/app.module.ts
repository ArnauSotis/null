import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { DemoMaterialModule } from './app.material-modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';


/*Custom Modules*/
import { AppNavbar } from './components/shared/navbar/navbar.component';
import { Register } from './components/register/register.component';
import { Urna } from './components/urna/urna.component';

import { CensoService } from './services/censo.service';
import { UrnaService } from './services/urna.service';
import { RSAService } from './services/rsa.service';
import { PaillierService } from './services/paillier.service';
import { EnvironmentHelper } from '../environments/environment';

/*Fake Backend*/
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from'./in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbar,
    Register,
    Urna
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    environment.production ?
      [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    DemoMaterialModule
  ],
  providers: [
    CensoService,
    UrnaService,
    RSAService,
    PaillierService,
    EnvironmentHelper
  ],
  bootstrap: [AppNavbar]
})
export class AppModule { }
