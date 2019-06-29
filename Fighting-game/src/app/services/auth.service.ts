import {MatSnackBar} from '@angular/material/snack-bar';
import { IUser } from './../models/user/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User; //
  userData: IUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    online: false,
    emailVerified: false,
    room: -1,
    fullname: '',
    birthDate: '',
    gender: '',
    bio: '',
  };

  loggedIn: string;
  userId: string;

  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public afs: AngularFirestore,
              private _snackBar: MatSnackBar
                ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', this.user.uid);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  public openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
          duration: 3000
      });
  }
  public async signUp(email: string, password: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.sendVerificationMail();
        this.setUserData(result.user, false);
        this._snackBar.open('You succesfully signed up', 'Ok');
      }).catch((error) => {
        this._snackBar.open(error, 'Ok'); //
      });
  }

  public sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public setUserData(user: any, isOnline: boolean): Promise<void> {
    const newUser = this.checkUserData(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${newUser.uid}`);
    console.log(userRef);
    const userData: IUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
      online: isOnline,
      emailVerified: newUser.emailVerified,
      room: -1,
      fullname: '',
      birthDate: '',
      gender: '',
      bio: '',
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  private saveUser(data: any): void {
    this.userData.uid = data.user.uid;
    this.userData.email = data.user.email;
    this.userData.displayName = '';
    this.userData.photoURL = '';
    this.userData.online = true;
    this.userData.emailVerified = false;
    this.userData.room = -1;
    // console.log(this.userData);
  }

  public async login(email: string, password: string): Promise<void> {
    if (this.userData.online === false) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.saveUser(result);
          this.router.navigate(['/main']);
          this.loggedIn = 'true';
          localStorage.setItem('loggedIn', this.loggedIn);
          // this.checkUserData(this.userData);
          this.setUserData(result.user, true);
          this._snackBar.open('You are logged In', 'Ok');
          this.getUserId();
        });
    } else {
        this._snackBar.open('You are already logged In' , 'Ok');
    }
  }

  public async doFacebookLogin(): Promise <void> {
    if (this.userData.online === false) {
      return this.authLogin(new auth.FacebookAuthProvider())
      .then((result) => {
        this.saveUser(result);
        this.router.navigate(['/main']);
        this.loggedIn = 'true';
        localStorage.setItem('loggedIn', this.loggedIn);
        this.setUserData(result.user, true); //
        this._snackBar.open('You are logged In', 'Ok');
        this.getUserId();
      });
    } else {
        this._snackBar.open('You are already logged In', 'Ok'); //
    }
  }

  public async doGoogleLogin(): Promise<void> {
    if (this.userData.online === false) {
      return this.authLogin(new auth.GoogleAuthProvider())
      .then((result) => {
        this.saveUser(result);
        this.router.navigate(['/main']);
        this.loggedIn = 'true';
        localStorage.setItem('loggedIn', this.loggedIn);
        this.setUserData(result.user, true);
        this._snackBar.open('You are logged In', 'Ok'); //
        this.getUserId();
      });
    } else {
        this._snackBar.open('You are already logged In', 'Ok'); //
    }
  }

  private async authLogin(provider: any): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  public async logout(): Promise<void> {
    this.getUserId();
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.updatePlayerOnlineState(this.userId, false);
      this.deleteUser();
      this.loggedIn = 'false';
      localStorage.setItem('loggedIn', this.loggedIn);
      this.router.navigate(['/login']);
      this._snackBar.open('You are logged Out', 'Ok');
    });
  }


  private deleteUser(): void {
    this.userData.uid = '';
    this.userData.email = '';
    this.userData.displayName = '';
    this.userData.photoURL = '';
    this.userData.online = false;
    this.userData.emailVerified = false;
    this.userData.room = -1;
  }


  public get isLoggedIn(): boolean {
    const playerState = JSON.parse(localStorage.getItem('loggedIn'));
    return playerState;
  }


  public getUserId() {
    this.userId = localStorage.getItem('user');
    return this.userId;
  }

  private checkUserData(user: any): any {
    const newUser = user;

    if (!newUser.uid) {
      newUser.uid = '';
    }
    if (!newUser.email) {
      newUser.email = '';
    }
    // if (!newUser.displayName) {
    //   console.log(this.userData.displayName);
    //   newUser.displayName = '';
    // }
    // if (!newUser.photoURL) {
    //   newUser.photoURL = '';
    // }
    if (!newUser.online) {
      newUser.online = false;
    }
    // if (!newUser.emailVerified) {
    //   newUser.emailVerified = false;
    // }
    if (!newUser.room) {
      newUser.room = -1;
    }
    return newUser;
  }

  submitUser(value) {
    this.getUserId();
    this.afs.collection('users').doc(this.userId).update({ fullname: value.fullname });
    value.birthday = new Date().toLocaleDateString();
    this.afs.collection('users').doc(this.userId).update({ birthDate: value.birthday });
    this.afs.collection('users').doc(this.userId).update({ gender: value.gender });
    this.afs.collection('users').doc(this.userId).update({ bio: value.bio });
    this.afs.collection('users').doc(this.userId).update({ photoURL: value.photoPath });
  }

  public updatePlayer(playerId: string, data: IUser): Promise<void> {
    return this.afs.collection('users').doc(playerId).update(data);
  }

  public updatePlayerOnlineState(playerId: string, isOnline: boolean) {
    return this.afs.collection('users').doc(playerId).update({online: isOnline});
  }

  public getPlayer(playerId: string): Observable<any> {
    return this.afs.collection('users').doc(playerId).valueChanges();
  }

  public getPlayers(): Observable<any[]> {
    return this.afs.collection('users').valueChanges();
  }

}
