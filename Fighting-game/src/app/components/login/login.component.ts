import { AuthService } from './../../services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../../models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authLogin: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.createloginForm();
  }
  private createloginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30) ]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
    });
}

public  login(email: string, password: string): Promise <void> {
  return this.authService.login(email, password);
}
public fbLogin(): Promise <void> {
  return this.authService.doFacebookLogin();
}
public  googleLogin(): Promise <void> {
  return this.authService.doGoogleLogin();
}
// public get isLoggedIn(): boolean {
//       return this.authService.isLoggedIn;
//     }
//     public isLoggedOut() {
//       return this.authService.logout();
//     }
}
