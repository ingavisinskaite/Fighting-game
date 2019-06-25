import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FistsComponent } from './fists/fists.component';
import { DaggerComponent } from './dagger/dagger.component';
import { SwordComponent } from './sword/sword.component';
import { FlailComponent } from './flail/flail.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

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
