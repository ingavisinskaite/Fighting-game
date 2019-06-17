import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { NewsComponent } from './components/news/news.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
