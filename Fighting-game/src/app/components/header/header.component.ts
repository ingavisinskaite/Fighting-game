import { AuthService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  run = true;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
    if (this.run) {
      document.getElementById('prof').setAttribute('style', 'display: none');
      this.run = false;
    }
  }
  // tarpininkas is AuthService
  public get isLoggedIn(): boolean {
    return this._auth.isLoggedIn;
  }

  public isLoggedOut(): Promise<void> {
    return this._auth.logout();
  }

  public logout(): Promise<void> {
    document.getElementById('prof').setAttribute('style', 'display: none');
    return this._auth.logout();
  }

}
