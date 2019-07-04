import {MatSnackBar} from '@angular/material/snack-bar';
import { IUser } from './../models/user/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import * as firebase from 'firebase';
import { IWeapon, IArmor } from '../models';
import { auth } from 'firebase/app';


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
    weaponRight: [{
      name: 'Fists',
      id: '0',
      damage: 10,
      oneHanded: true,
      image: '/assets/images/weapons/knuckles.svg'
    }],
    weaponLeft: [],
    armorHead: [],
    armorTorso: [],
    armorArms: [],
    armorLegs: [],
    fighter: {
      name: '',
      class: 'Fighter',
      hp: 100,
      attack: '',
      defence: '',
      weaponRight: {
        name: '',
        id: '',
        damage: 0,
        oneHanded: true,
        image: ''
      },
      weaponLeft: {
        name: '',
        id: '',
        damage: 0,
        oneHanded: true,
        image: ''
      },
      armorHead: {
        protec: 'head',
        criticalDmgCounter: 0,
        criticalDmg: 0,
        name: '',
        id: '',
        armor: 0,
        durability: 0,
        image: './assets/images/body/head.svg'
      },
      armorTorso: {
        protec: 'torso',
        criticalDmgCounter: 0,
        criticalDmg: 0,
        name: '',
        id: '',
        armor: 0,
        durability: 0,
        image: './assets/images/body/torso.svg'
      },
      armorArms: {
        protec: 'arms',
        criticalDmgCounter: 0,
        criticalDmg: 0,
        name: '',
        id: '',
        armor: 0,
        durability: 0,
        image: './assets/images/body/arms.svg'
      },
      armorLegs: {
        protec: 'legs',
        criticalDmgCounter: 0,
        criticalDmg: 0,
        name: '',
        id: '',
        armor: 0,
        durability: 0,
        image: './assets/images/body/legs.svg'
      }
    }
  };

  loggedIn: string;

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
        this.setUserData(result.user);
        this._snackBar.open('You succesfully signed up', 'Ok');
      }).catch((error) => {
        this._snackBar.open(error, 'Ok'); //
      });
  }

  public sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public setUserData(user: any): Promise<void> {
    const newUser = this.checkUserData(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${newUser.uid}`);
    console.log(userRef);
    const userData: IUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
      online: false,
      emailVerified: user.emailVerified,
      room: -1,
      weaponRight: [{
        name: 'Fists',
        id: '0',
        damage: 10,
        oneHanded: true,
        image: '/assets/images/weapons/knuckles.svg'
      }],
      weaponLeft: [],
      armorHead: [],
      armorTorso: [],
      armorArms: [],
      armorLegs: [],
      fighter: {
        name: '',
        class: 'Fighter',
        hp: 100,
        attack: '',
        defence: '',
        weaponRight: {
          name: '',
          id: '',
          damage: 0,
          oneHanded: true,
          image: ''
        },
        weaponLeft: {
          name: '',
          id: '',
          damage: 0,
          oneHanded: true,
          image: ''
        },
        armorHead: {
          protec: 'head',
          criticalDmgCounter: 0,
          criticalDmg: 0,
          name: '',
          id: '',
          armor: 0,
          durability: 0,
          image: './assets/images/body/head.svg'
        },
        armorTorso: {
          protec: 'torso',
          criticalDmgCounter: 0,
          criticalDmg: 0,
          name: '',
          id: '',
          armor: 0,
          durability: 0,
          image: './assets/images/body/torso.svg'
        },
        armorArms: {
          protec: 'arms',
          criticalDmgCounter: 0,
          criticalDmg: 0,
          name: '',
          id: '',
          armor: 0,
          durability: 0,
          image: './assets/images/body/arms.svg'
        },
        armorLegs: {
          protec: 'legs',
          criticalDmgCounter: 0,
          criticalDmg: 0,
          name: '',
          id: '',
          armor: 0,
          durability: 0,
          image: './assets/images/body/legs.svg'
        }
      }
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
          console.log(result);
          this.saveUser(result);
          this.router.navigate(['/main']);
          this.loggedIn = 'true';
          localStorage.setItem('loggedIn', this.loggedIn);
          // this.checkUserData(this.userData);
          // this.setUserData(result.user);
          console.log(result);
          this._snackBar.open('You are logged In', 'Ok');
        });
    } else {
        this._snackBar.open('You are already logged In' , 'Ok'); //
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
        // this.setUserData(result.user);
        this._snackBar.open('You are logged In', 'Ok');
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
        // this.setUserData(result.user);
        this._snackBar.open('You are logged In', 'Ok'); //
      });
    } else {
        this._snackBar.open('You are already logged In', 'Ok'); //
    }
  }

  private async authLogin(provider: any): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  public async logout(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.deleteUser();
      this.loggedIn = 'false';
      localStorage.setItem('loggedIn', this.loggedIn);
      this.router.navigate(['/login']);
      this._snackBar.open('You are logged Out', 'Ok'); //
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

  // Is local storage ima current user
  public getUserId() {
    let userId = localStorage.getItem('user');
    return userId;
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

}
