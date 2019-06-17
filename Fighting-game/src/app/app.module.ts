import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyService, AuthService } from './services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

// import { HeaderComponent } from './components/login/header/header.component';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MapComponent,
    NewsComponent,
    LoginComponent,
    LobbyComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    BrowserModule
  ],
  providers: [AuthService, LobbyService],
  bootstrap: [AppComponent]
})
export class AppModule { }