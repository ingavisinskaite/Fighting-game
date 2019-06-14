import { Injectable, NgZone } from '@angular/core';
import { IUser } from '../../models/user/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
providedIn: 'root'
})
export class AuthService {
    userData: any;

constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
) {}

public async signUp(email: string, password: string, confpassword: string): Promise<void> {
    console.log(email, password, confpassword);
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
