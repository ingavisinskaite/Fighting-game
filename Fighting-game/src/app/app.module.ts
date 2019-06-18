import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Weaponry, Armory } from './classes';
import { FightService } from './services/fight.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ArenaComponent } from './arena/arena.component';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [FightService, Weaponry, Armory],
  bootstrap: [AppComponent]
})
export class AppModule { }
