import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Register } from './components/register/register.component';
import { Urna } from './components/urna/urna.component';

const routes: Routes = [
  { path: '', redirectTo: '/censo', pathMatch: 'full' },
  { path: 'censo', component: Register },
  { path: 'urna', component: Urna },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
