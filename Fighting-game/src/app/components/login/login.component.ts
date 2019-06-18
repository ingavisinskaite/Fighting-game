import { AuthService } from './../../services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
}
