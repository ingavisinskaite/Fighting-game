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

  fighterOneId = '0';
  fighterTwoId = '1';

  currentPlayerId = '';

  constructor(public _fight: FightService,
              public _weaponry: Weaponry,
              public _armory: Armory) { }

  ngOnInit() {
  }

  chooseWeapon(fighterId: string, weaponId: string, oneHanded: boolean) {
    this._fight.assignWeapon(fighterId, weaponId, oneHanded);
  }

  chooseArmor(fighterId: string, armorId: string, protec: string) {
    this._fight.assignArmor(fighterId, armorId, protec);
    // console.log('armor id:' + armorId);
  }

  // OK
  showFighterHP() {
    this.currentFighterHP = this._fight.getFightersHP(this.currentPlayer);
  }

  // Labai graži funkcija, bet kaip "id" čia atsiranda?
  getCurrentPlayerId(id: string) {
    if (id === this._fight.playerOneId) {
      this.currentPlayerId = id;
      console.log('getCurrentPlayerId, One' + this.currentPlayerId);
    }
    if (id === this._fight.playerTwoId) {
      this.currentPlayerId = id;
      console.log('getCurrentPlayerId, Two' + this.currentPlayerId);
    }
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

  fight() {
    this._fight.calculateCombat(this.fighterOneId, this.fighterTwoId);
    console.log('Clash');
  }

}
