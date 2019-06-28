import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  run = true;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    if (this.run) {
      document.getElementById('prof').setAttribute('style', 'display: none');
      this.run = false;
    }
  }

  public get isLoggedIn(): boolean {
    return this.loggedIn = this._auth.isLoggedIn;
  }

  public logout(): Promise<void> {
    return this._auth.logout();
  }

}
