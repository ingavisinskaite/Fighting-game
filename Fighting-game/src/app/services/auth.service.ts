import { IUser } from './../models/user/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import * as firebase from 'firebase';
import { IWeapon, IArmor } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User; //
  // userId: any;
  userData: IUser = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    online: false,
    emailVerified: false,
    room: -1,
    weaponRight: [],
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
    public afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', this.user.uid);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // public async login(email: string, password: string): Promise<void> {
  //   try {
  //     await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //     this.router.navigate(['/']);
  //     window.alert('You have successfully logged in');
  //   } catch (e) {
  //     alert('Error!' + e.message);
  //   }
  // }

  // public async logout(): Promise<void> {
  //   await this.afAuth.auth.signOut();
  //   localStorage.removeItem('user');
  //   this.router.navigate(['/login']);
  //   window.alert('You have successfully logged out');
  // }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user !== null;
  // }

  public async signUp(email: string, password: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  public sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      online: false,
      emailVerified: user.emailVerified,
      room: -1,
      weaponRight: [],
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

  private saveUser(data: any) {
    this.userData.uid = data.user.uid;
    this.userData.email = data.user.email;
    this.userData.displayName = data.user.displayName;
    this.userData.photoURL = data.user.photoURL;
    this.userData.online = data.user.online;
    this.userData.emailVerified = data.user.emailVerified;
    this.userData.room = data.user.room;
    console.log(this.userData);
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
          this.setUserData(result.user);
          window.alert('You have successfully logged in');
        });
    } else {
      window.alert('Allready logged in !!!');
    }
  }
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
  // public facebookAuth(): Promise <void> {
  //   return this.authLogin(new firebase.auth.FacebookAuthProvider());
  // }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }

  //   public googleAuth(): Promise<void> {
  //     return this.authLogin(new firebase.auth.GoogleAuthProvider());
  // }

  private async authLogin(provider: any): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }


  public async logout(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.deleteUser();
      this.loggedIn = 'false';
      localStorage.setItem('loggedIn', this.loggedIn);
      this.router.navigate(['/login']);
      window.alert('You have successfully logged out');
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
    let playerState = JSON.parse(localStorage.getItem('loggedIn'));
    return playerState;
  }


  public getUserId() {
    return this.userData.uid;
  }

}
