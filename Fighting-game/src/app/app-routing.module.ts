import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../app/components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'register-user', component: SignUpComponent },
  { path:  'login', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
