import { FightService } from '../../services/fight.service';
import { Armory, Weaponry } from '../../classes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  currentPlayer = '0';
  currentFighterHP = 0;

  constructor(public _fight: FightService,
              public _weaponry: Weaponry,
              public _armory: Armory) { }

  ngOnInit() {
    this.showFighterHP(this.currentPlayer);
  }

  chooseWeapon(fighterId: string, weaponId: string, oneHanded: boolean) {
    this._fight.assignWeapon(fighterId, weaponId, oneHanded);
  }

  chooseArmor(fighterId: string, armorId: string) {
    this._fight.assignArmor(fighterId, armorId);
  }

  // Pakeisti, kad rodytų iš service
  showFighterHP(fighterId: string) {
    this.currentFighterHP = this._fight.getFightersHP(fighterId);
  }

  changePlayer() {
    if (this.currentPlayer === '0') {
      this.currentPlayer = '1';
      console.log(this.currentPlayer);
    } else {
      this.currentPlayer = '0';
      console.log(this.currentPlayer);
    }
  }

  chooseAttack(fighterId: string, bodyPart: string) {
    this._fight.assignAttack(fighterId, bodyPart);
  }

  chooseDefence(fighterId: string, bodyPart: string) {
    this._fight.assignDefence(fighterId, bodyPart);
  }

}
