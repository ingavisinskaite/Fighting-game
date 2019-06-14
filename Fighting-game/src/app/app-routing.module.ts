import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{path: 'header', component: HeaderComponent},
{path: 'main', component: MainComponent},
{path: 'map', component: MapComponent},
{path: 'news', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
