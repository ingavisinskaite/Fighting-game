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

  constructor(public afAuth: AngularFireAuth,
              public router: Router,
              public afs: AngularFirestore) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/lobby']);
      window.alert('You have successfully logged in');
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  public async logout(): Promise<void> {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    window.alert('You have successfully logged out');
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
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

  public SendVerificationMail(): Promise<void>  {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public SetUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        nemailVerified: user.emailVerified
    };
    return userRef.set(userData, {
    merge: true
    });
  }


}
