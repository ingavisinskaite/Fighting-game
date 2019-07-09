import { IWeapon } from './../../models/weapon.model';
import { Weaponry } from './../../classes/weapons.class';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FistsComponent } from './fists/fists.component';
import { DaggerComponent } from './dagger/dagger.component';
import { SwordComponent } from './sword/sword.component';
import { FlailComponent } from './flail/flail.component';
import { ShopService } from './../../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  // addweapon(): void {
  //   this.IWeapon.Id.addweapon(this.IWeapon.Id);
  //   console.log('ok');
  // }

  openDialogFists() {
    const dialogRef = this.dialog.open(FistsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSword() {
    const dialogRef = this.dialog.open(SwordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogDagger() {
    const dialogRef = this.dialog.open(DaggerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogFlail() {
    const dialogRef = this.dialog.open(FlailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
