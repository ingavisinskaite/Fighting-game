import { IRoom } from './../models/room.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IUser } from '../models/user/user.model';
import { IWeapon } from '../models/weapon.model';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(private afs: AngularFirestore) { }

  addweapon(weaponId): void {
    this.afs.collection('users').add(weaponId);
    console.log('weapon added');
  }

  public updateweapon(weaponId: string, data: IWeapon): Promise<void> {
    return this.afs.collection('users').doc(weaponId).update(data);
  }

  public getWeapon(weaponId: string): Observable<any> {
    return this.afs.collection('users').doc(weaponId).valueChanges();
  }

  public getWeapons(): Observable<any[]> {
    return this.afs.collection('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as IWeapon;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

}
