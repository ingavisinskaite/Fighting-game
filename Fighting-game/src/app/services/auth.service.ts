import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'firebase';
import { IUser } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  userData: IUser;
  userId: string;

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

  public async signUp(email: string, password: string): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  public SendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      online: false,
      emailVerified: user.emailVerified,
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

  public async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/lobby']);
      window.alert('You have successfully logged in');
      this.getUserId();
      document.getElementById('prof').setAttribute('style', 'display: block');
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  public async logout(): Promise<void> {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    window.alert('You have successfully logged out');
  }

  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
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

  public getUserId(): string {
    this.userId = localStorage.getItem('user');
    return this.userId;
  }
  public setRoom(roomNum: number, uid: string): Promise<void> {
    return this.afs.collection('users').doc(uid).update({ room: roomNum });
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
}
