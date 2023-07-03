import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { FlowerDetailComponent } from './flowers/flower-detail/flower-detail.component';
import { FlowerEditComponent } from './flowers/flower-edit/flower-edit.component';
import { FlowersComponent } from './flowers/flowers.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/flowers', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
  ] },
  { path: 'flowers', component: FlowersComponent, children: [
    { path: 'new', component: FlowerEditComponent },
    { path: ':id', component: FlowerDetailComponent },
    { path: ':id/edit', component: FlowerEditComponent }
  ] }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  
  export class AppRoutingModule {
  
  }
