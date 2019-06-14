import { AuthService } from './auth/auth.service.service';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './admin/login/login.component';
import { HeaderComponent } from './header/header.component';

const config = {
  apiKey: 'AIzaSyDGo7ZbbSGzja22l2yQi3ovJo971mYWg5w',
  authDomain: 'first-project-20ab3.firebaseapp.com',
  databaseURL: 'https://first-project-20ab3.firebaseio.com',
  projectId: 'first-project-20ab3',
  storageBucket: 'first-project-20ab3.appspot.com',
  messagingSenderId: '1016833167186',
  appId: '1:1016833167186:web:c556ef1603552f1f'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
