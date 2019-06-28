import { CannotFoundComponent } from './components/404/404.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LobbyService, AuthService } from './services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Weaponry, Armory } from './classes';
import { FightService } from './services/fight.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ArenaComponent } from './components/arena/arena.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';



import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { NewsComponent } from './components/news/news.component';
import { RoomComponent } from './components/room/room.component';
import { ShopComponent } from './components/shop/shop.component';
import { DaggerComponent } from './components/shop/dagger/dagger.component';
import { FistsComponent } from './components/shop/fists/fists.component';
import { FlailComponent } from './components/shop/flail/flail.component';
import { SwordComponent } from './components/shop/sword/sword.component';
import { FormsComponent } from './components/profile/forms/forms.component';


@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    SignUpComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    MapComponent,
    NewsComponent,
    LoginComponent,
    LobbyComponent,
    RoomComponent,
    ShopComponent,
    DaggerComponent,
    FistsComponent,
    FlailComponent,
    SwordComponent,
    CannotFoundComponent,
    FormsComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],

  entryComponents: [ShopComponent, FistsComponent, DaggerComponent, SwordComponent, FlailComponent],
  providers: [FightService, Weaponry, Armory, AuthService, LobbyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
