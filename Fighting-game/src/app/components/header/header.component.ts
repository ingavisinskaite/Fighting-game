import { User } from 'firebase';
import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

    // tarpininkas is AuthService
    public get isLoggedIn(): boolean {
      return this._auth.isLoggedIn;
    }
  
    public isLoggedOut(): Promise<void> {
      return this._auth.logout();
    }

    public logout(): Promise<void> {
      return this._auth.logout();
    }
}
