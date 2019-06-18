import { IRoom } from './../models/room.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IUser } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class LobbyService {

  constructor(private afs: AngularFirestore) { }

  public getOnlinePlayers(): Observable<any[]> {
    return this.afs.collection('users').valueChanges();
  }

  public updateRoomPlayers(roomId: string, data: IRoom): Promise<void> {
    return this.afs.collection('rooms').doc(roomId).update(data);
  }

  public getRooms(): Observable<any[]> {
    return this.afs.collection('rooms').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as IRoom;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

}
