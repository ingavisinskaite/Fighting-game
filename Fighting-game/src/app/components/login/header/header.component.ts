import { AuthService } from '../../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  // tarpininkas is AuthService
  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public isLoggedOut() {
    return this.authService.logout();
  }
}
