import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { IUser } from '../models/user/user.model';
import * as firebase from 'firebase/app';
import { userInfo } from 'os';

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
      room: -1

  };

  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user.uid));
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
      room: -1
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
  }

  public async login(email: string, password: string): Promise<void> {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.saveUser(result);
        this.router.navigate(['/login']);
        this.setUserData(result.user);
        window.alert('You have successfully logged in');
      })

      .catch ((error) => {
      alert('Error!' + error.message);
      });
  }


  public async logout(): Promise<void> {
      return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.deleteUser();
      this.router.navigate(['/login']);
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
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null && user.emailVerified !== false) ? true : false;
}

// public getCurrentUserId() {
//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     this.userId = user.uid;
//     console.log(this.userId);
//   } else {
//     // No user is signed in.
//   }
// });
// }

// public getUserId(): string {
//   this.userId = localStorage.getItem('user');
//   console.log(this.userId);
//   return this.userId;
// }

}
