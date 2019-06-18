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

// Nežinau kaip paimti HP iš to Array, tai dabar taip priskyriau.
// Nesugalvoju, kaip pernaudoti tas pačias funkcijas abiem žaidėjam, kad išsisaugotų pasirinkimų vertės.
// Atakuojamai/Kiekvienai kūno daliai reikia priskirti: armor: number, defence: boolean.
// Atakai reikia priskirti: weapon.damage: number, attack: string.
// Rezultate kiekvieno Fighter HP reikia priskirti aritmetiką ir pokytį. Išsaugoti kitam turnui.
  currentFighterHP = 100;

  currentFighterDamage: number;
  currentFighterAttack: string;
  currentFighterDefence: string;

  constructor(public _fight: FightService,
              public _weaponry: Weaponry,
              public _armory: Armory) { }

  ngOnInit() {
  }

  chooseWeapon(fighterId: string, weaponId: string, oneHanded: boolean) {
    this._fight.assignWeapon(fighterId, weaponId, oneHanded);
  }

  chooseArmor(fighterId: string, armorId: string) {
    this._fight.assignArmor(fighterId, armorId);
  }

  attackTest(weaponId: string, oneHanded: boolean) {
    this.currentFighterDamage = this._fight.getDamage(weaponId, oneHanded);
    this.currentFighterHP -= this.currentFighterDamage;
  }

  // 1. Reikia funkcijos, kuri išsaugotų pirmo žaidėjo pasirinkimus ir paduotų antro žaidėjo langą. 
  // Į ją ir changePlayer() turėtų įeiti. 

  changePlayer() {
    if (this.currentPlayer === '0') {
      this.currentPlayer = '1';
      console.log(this.currentPlayer);
    } else {
      this.currentPlayer = '0';
      console.log(this.currentPlayer);
    }
  }

  chooseAttack(bodyPart: string) {
    this.currentFighterAttack = bodyPart;
    console.log(this.currentFighterAttack);
  }

  chooseDefence(bodyPart: string) {
    this.currentFighterDefence = bodyPart;
    console.log(this.currentFighterDefence);
  }

}
