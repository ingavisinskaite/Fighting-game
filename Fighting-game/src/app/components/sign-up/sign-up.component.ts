
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {



  constructor(public authService: RegisterService) { }

  ngOnInit() {
  }

  public signUp(email: string, password: string, confpassword: string): Promise<void> {
    if (password === confpassword) {
      return this.authService.signUp(email, password, confpassword);
    } else {
      window.alert('PASSWORDS DONT MATCH');
    }
  }


}
