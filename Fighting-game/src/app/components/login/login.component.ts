import { AuthService } from './../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public isLoggedOut(): Promise<void> {
    return this.authService.logout();
  }

  public login(email: string, password: string): Promise<void> {
    return this.authService.login(email, password);
  }

}
