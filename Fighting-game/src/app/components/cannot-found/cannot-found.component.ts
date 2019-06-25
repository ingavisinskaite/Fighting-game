import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cannot-found',
  templateUrl: './cannot-found.component.html',
  styleUrls: ['./cannot-found.component.scss']
})
export class CannotFoundComponent implements OnInit {
  loggedIn: boolean;

  constructor(private _authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  public isLoggedIn() {
    this.loggedIn = this._authService.isLoggedIn;
    console.log(this.loggedIn);
    if (this.loggedIn) {
      this.router.navigateByUrl('/main');
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
