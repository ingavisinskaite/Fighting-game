import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
signUpForm: FormGroup;


  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.createSignUpForm();
  }
  private createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30) ]),
      password: new FormControl ('', [Validators.required, Validators.minLength(6)]),
      confpassword: new FormControl ('', [Validators.required, Validators.minLength(6)])
    });

  }

  public signUp(email: string, password: string, confpassword: string): Promise<void> {
    if (password === confpassword) {
      return this.authService.signUp(email, password);
    } else {
      window.alert('PASSWORDS DONT MATCH');
    }
  }
}
