import { IUser } from './../models/user/user.model';
import { LobbyService } from './lobby.service';
import { RoomComponent } from './../components/room/room.component';
import { IRoom } from 'src/app/models/room.model';
import { Armory } from './../classes/armor.class';
import { IArmor } from '../models/armor.model';
import { IWeapon } from '../models/weapon.model';
import { Weaponry } from './../classes/weapons.class';
import { Injectable } from '@angular/core';
import { IFighter } from '../models';

@Injectable({
  providedIn: 'root'
})

export class FightService {

  room: IRoom;
  roomNum: number;

  playerOneId: string;
  playerTwoId: string;

  playerOne: IUser;
  playerTwo: IUser;

  fighterOne: IFighter;
  fighterTwo: IFighter;

// Šitie du fighteriai yra dabar tik šiaip. Realiai visi fighteriai turėtų ateiti iš duomenų bazės?
// Mes dar čia nurodėme class, tai reikėtų jos modelį aprašyti ir apgalvoti, ką ji daro. Ir suimportuoti
// į IFighter?
// Turbūt reikia leftArm ir rightArm, nes skirtingi img turėtų būti naudojami, ar bent jau reverse.

  // fighters: IFighter[] = [{
  //   name: 'Simas',
  //   id: '0',
  //   class: 'warrior',
  //   hp: 100,
  //   attack: 'none',
  //   defence: 'none',
  //   weaponLeft: {
  //     name: 'Fists',
  //     id: '0',
  //     damage: 10,
  //     oneHanded: true,
  //     image: 'Fists.svg'
  //   },
  //   weaponRight: {
  //     name: 'Fists',
  //     id: '0',
  //     damage: 10,
  //     oneHanded: true,
  //     image: 'Fists.svg'
  //   },
  //   armorArms: {
  //     protec: 'arms',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/arms.svg'
  //   },
  //   armorLegs: {
  //     protec: 'legs',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/legs.svg'
  //   },
  //   armorTorso: {
  //     protec: 'torso',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/torso.svg'
  //   },
  //   armorHead: {
  //     protec: 'head',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/head.svg'
  //   }
  // },
  // {
  //   name: 'Zbignev',
  //   id: '1',
  //   class: 'warrior',
  //   hp: 100,
  //   attack: 'none',
  //   defence: 'none',
  //   weaponLeft: {
  //     name: 'Fists',
  //     id: '0',
  //     damage: 10,
  //     oneHanded: true,
  //     image: 'fists.svg'
  //   },
  //   weaponRight: {
  //     name: 'Fists',
  //     id: '0',
  //     damage: 10,
  //     oneHanded: true,
  //     image: 'fists.svg'
  //   },
  //   armorArms: {
  //     protec: 'arms',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/arms.svg'
  //   },
  //   armorLegs: {
  //     protec: 'legs',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/legs.svg'
  //   },
  //   armorTorso: {
  //     protec: 'torso',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/torso.svg'
  //   },
  //   armorHead: {
  //     protec: 'head',
  //     criticalDmgCounter: 2,
  //     criticalDmg: 0,
  //     name: 'none',
  //     id: '0',
  //     armor: 0,
  //     durability: 0,
  //     image: './assets/images/body/head.svg'
  //   }
  // }];

  constructor(private _weaponry: Weaponry,
              private _armory: Armory,
              private _lobbyService: LobbyService) { }

  public initFighters() {
  }

  // Man reikia pačiam įrašyti ROOM number, kad pagauti ten esančius vartotojus. 
  // Ga galėčiau naudoti _room funkciją, bet ji ne visus man reikalingus duomenis duoda. 
  // Gaunu UIDs, pagal kuriuos galiu gauti user.fighter data.
  public getPlayersUids(roomNum: number) {
    const roomId = 'Room ' + roomNum;
    this._lobbyService.getRoom(roomId).subscribe(room => {
      this.room = room;
      this.playerOneId = this.room.player1;
      this.playerTwoId = this.room.player2;
      console.log('getPlayersUids, One: ' + this.playerOneId);
      console.log('getPlayersUids, Two: ' + this.playerTwoId);
    });
  }

  // Tas "player" yra Observable data. Pavadinti galima bet kaip. 
  // Gaunu player.fighter duomenis, kurie nugula į this.FighterTwo ir this.fighterOne
  // Greičiausiai man reikia tik User, nes vis tiek reikia Id. 
  public getPlayers(playerId: string) {
    if (playerId === this.playerOneId) {
      this._lobbyService.getPlayer(playerId).subscribe(player => {
        this.fighterOne = player.fighter;
        this.playerOne = player;
        console.log('getPlayers, One: ' + this.playerOne.email);
      });
    }
    if (playerId === this.playerTwoId) {
      this._lobbyService.getPlayer(playerId).subscribe(player => {
        this.fighterTwo = player.fighter;
        this.playerTwo = player;
        console.log('getPlayers, Two: ' + this.playerTwo.email);
      });
    }
  }

  // Susisiekia su lobbyService esančia update funkcija ir nusiunčia jai naują data.
  public updatePlayer(playerId: string, data: IUser) {
    this._lobbyService.updatePlayer(playerId, data);
    console.log('updatePlayer: success');
  }

  // public getFightersHP(id: string): number {
  //   return this.fighters[this.getFighterIndex(id)].hp;
  // }

  public getFightersHP(userId: string) {
    return this.getFighter(userId).fighter.hp;
  }

  // If fighter1.attack === fighter2.defence { attack is blocked and no harm is done }
  //PAKEISTA
  public assignAttack(playerId: string, bodyPart: string) {
    if (playerId === this.playerOneId) {
      this.playerOne.fighter.attack = bodyPart;
      console.log('playerOne attack: ' + bodyPart);
    }
    if (playerId === this.playerTwoId) {
      this.playerTwo.fighter.attack = bodyPart;
      console.log('playerTwo attack: ' + bodyPart);
    }
  }

  //PAKEISTA
  public assignDefence(playerId: string, bodyPart: string) {
    if (playerId === this.playerOneId) {
      this.playerOne.fighter.defence = bodyPart;
      console.log('playerOne defence: ' + bodyPart);
    }
    if (playerId === this.playerTwoId) {
      this.playerTwo.fighter.defence = bodyPart;
      console.log('playerTwo defence: ' + bodyPart);
    }
  }

  // weaponRight.damage - because we always assign weapon to rightArm, even when it is twoHanded
  // For now we use Fighter Index to access objects from fighters Array. When we connect to DB we'll use
  // Fighter's unique id's (will add two parameters to function).
  // First we determine if attack hasn't been defended. Then we check armor.durability (if armor hasn't been destroyed)
  // And at the end we calculate damage delivered to fighter.hp and rewrite it in the object.
  //PAKEISTA
  public calculateCombat(playerOneId: string, playerTwoId: string) {
    if (this.playerOne.fighter.attack !== this.playerTwo.fighter.defence) {
      this.changeAttackedPartArmorDurability(playerOneId, playerTwoId);
      this.changeCriticalCounterAndDmg(playerOneId, playerTwoId);
      this.playerTwo.fighter.hp -= (this.playerOne.fighter.weaponRight.damage +
      this.getCriticalDmg(playerOneId, playerTwoId) - this.getAttackedPartArmor(playerOneId, playerTwoId));
    }
    if (this.playerTwo.fighter.attack !== this.playerOne.fighter.defence) {
      this.changeAttackedPartArmorDurability(playerTwoId, playerOneId);
      this.changeCriticalCounterAndDmg(playerTwoId, playerOneId);
      this.playerOne.fighter.hp -= (this.playerTwo.fighter.weaponRight.damage +
      this.getCriticalDmg(playerTwoId, playerOneId) - this.getAttackedPartArmor(playerTwoId, playerOneId));
    }
  }

  //NEW
  private getFighter(userId: string) {
    if (userId === this.playerOneId) {
      return this.playerOne;
    }
    if (userId === this.playerTwoId) {
      return this.playerTwo;
    }
  }

  // Different parts of fighters body can have different armor, thus we compare two strings from fighters[] objects
  // (attack and protec) to determin what kind of armor attacked body part has.
  //PAKEISTA
  private getAttackedPartArmor(attackingFighterId: string, defendingFighterId: string): number {
    let armor = 0;
    if (this.getFighter(attackingFighterId).fighter.attack ===
    this.getFighter(defendingFighterId).fighter.armorHead.protec) {
      armor = this.getFighter(defendingFighterId).fighter.armorHead.armor;
    } else if (this.getFighter(attackingFighterId).fighter.attack ===
    this.getFighter(defendingFighterId).fighter.armorTorso.protec) {
      armor = this.getFighter(defendingFighterId).fighter.armorTorso.armor;
    } else if (this.getFighter(attackingFighterId).fighter.attack ===
    this.getFighter(defendingFighterId).fighter.armorArms.protec) {
      armor = this.getFighter(defendingFighterId).fighter.armorArms.armor;
    } else if (this.getFighter(attackingFighterId).fighter.attack ===
    this.getFighter(defendingFighterId).fighter.armorLegs.protec) {
      armor = this.getFighter(defendingFighterId).fighter.armorLegs.armor;
    } else {
      armor = 0;
    }
    return armor;
  }

  //PAKEISTA
  private getCriticalDmg(attackingFighterId: string, defendingFighterId: string): number {
    let dmg = 0;

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorHead.protec) {
      dmg = this.getFighter(defendingFighterId).fighter.armorHead.criticalDmg;

      return dmg;
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorTorso.protec) {
      dmg = this.getFighter(defendingFighterId).fighter.armorTorso.criticalDmg;

      return dmg;
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorArms.protec) {
      dmg = this.getFighter(defendingFighterId).fighter.armorArms.criticalDmg;

      return dmg;
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorLegs.protec) {
      dmg = this.getFighter(defendingFighterId).fighter.armorLegs.criticalDmg;

      return dmg;
    }
  }

  // Different armor has different durability (times it can be hit before it is destroyed).
  // NOTE: armor is destroyed only for the time of the combat, no changes are applyed to DB.
  // In future we could change how damaged body part looks (change svg).
  //PAKEISTA
  private changeAttackedPartArmorDurability(attackingFighterId: string, defendingFighterId: string) {

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorHead.protec) {
      this.getFighter(defendingFighterId).fighter.armorHead.durability -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorHead.durability < 0) {
        this.getFighter(defendingFighterId).fighter.armorHead.armor = 0;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorTorso.protec) {
      this.getFighter(defendingFighterId).fighter.armorTorso.durability -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorTorso.durability < 0) {
        this.getFighter(defendingFighterId).fighter.armorTorso.armor = 0;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorArms.protec) {
      this.getFighter(defendingFighterId).fighter.armorArms.durability -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorArms.durability < 0) {
        this.getFighter(defendingFighterId).fighter.armorArms.armor = 0;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorLegs.protec) {
      this.getFighter(defendingFighterId).fighter.armorLegs.durability -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorLegs.durability < 0) {
        this.getFighter(defendingFighterId).fighter.armorLegs.armor = 0;
      }
    }
  }

  //PAKEISTA
  private changeCriticalCounterAndDmg(attackingFighterId: string, defendingFighterId: string) {

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorHead.protec) {
      this.getFighter(defendingFighterId).fighter.armorHead.criticalDmgCounter -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorHead.criticalDmgCounter < 0) {
        this.getFighter(defendingFighterId).fighter.armorHead.criticalDmg += 5;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorTorso.protec) {
      this.getFighter(defendingFighterId).fighter.armorTorso.criticalDmgCounter -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorTorso.criticalDmgCounter < 0) {
        this.getFighter(defendingFighterId).fighter.armorTorso.criticalDmg += 5;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorArms.protec) {
      this.getFighter(defendingFighterId).fighter.armorArms.criticalDmgCounter -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorArms.criticalDmgCounter < 0) {
        this.getFighter(defendingFighterId).fighter.armorArms.criticalDmg += 5;
      }
    }

    if (this.getFighter(attackingFighterId).fighter.attack ===
      this.getFighter(defendingFighterId).fighter.armorLegs.protec) {
      this.getFighter(defendingFighterId).fighter.armorLegs.criticalDmgCounter -= 1;

      if (this.getFighter(defendingFighterId).fighter.armorLegs.criticalDmgCounter < 0) {
        this.getFighter(defendingFighterId).fighter.armorLegs.criticalDmg += 5;
      }
    }
  }

  //PAKEISTA
  public assignWeapon(playerId: string, weaponId: string, oneHanded: boolean) {
    if (playerId === this.playerOneId) {
      if (oneHanded) {
        this.playerOne.fighter.weaponRight = this.getOneHandedWeapon(weaponId);
        console.log('playerOne: Assign weaponRight');
      } else {
        this.playerOne.fighter.weaponLeft = this.getTwoHandedWeapon(weaponId);
        this.playerOne.fighter.weaponRight = this.getTwoHandedWeapon(weaponId);
        console.log('playerOne: Assign weaponLeft');
      }
    }

    if (playerId === this.playerTwoId) {
      if (oneHanded) {
        this.playerTwo.fighter.weaponRight = this.getOneHandedWeapon(weaponId);
        console.log('playerTwo: Assign weaponRight');
      } else {
        this.playerTwo.fighter.weaponLeft = this.getTwoHandedWeapon(weaponId);
        this.playerTwo.fighter.weaponRight = this.getTwoHandedWeapon(weaponId);
        console.log('playerTwo: Assign weaponLeft');
      }
    }

  }

  private getOneHandedWeapon(id: string): IWeapon {
    for (const weapon of this._weaponry.oneHanded) {
      if (weapon.id === id) {
        return weapon;
      }
    }
  }

  private getTwoHandedWeapon(id: string): IWeapon {
    for (const weapon of this._weaponry.twoHanded) {
      if (weapon.id === id) {
        return weapon;
      }
    }
  }

  //PAKEISTA
  public assignArmor(playerId: string, armorId: string, protec: string) {
    if (playerId === this.playerOneId) {

      if (protec === 'head') {
        this.playerOne.fighter.armorHead = this.getHeadArmor(armorId);
        console.log('playerOne: Head armor assigned');
      }
      if (protec === 'torso') {
        this.playerOne.fighter.armorTorso = this.getTorsoArmor(armorId);
        console.log('playerOne: Torso armor assigned')
      }
      if (protec === 'arms') {
        this.playerOne.fighter.armorArms = this.getArmsArmor(armorId);
        console.log('playerOne: Arms armor assigned')
      }
      if (protec === 'legs') {
        this.playerOne.fighter.armorLegs = this.getLegsArmor(armorId);
        console.log('playerOne: Leg armor assigned')
      }
    }

    if (playerId === this.playerTwoId) {

      if (protec === 'head') {
        this.playerTwo.fighter.armorHead = this.getHeadArmor(armorId);
        console.log('playerTwo: Head armor assigned');
      }
      if (protec === 'torso') {
        this.playerTwo.fighter.armorTorso = this.getTorsoArmor(armorId);
        console.log('playerTwo: Torso armor assigned')
      }
      if (protec === 'arms') {
        this.playerTwo.fighter.armorArms = this.getArmsArmor(armorId);
        console.log('playerTwo: Arms armor assigned')
      }
      if (protec === 'legs') {
        this.playerTwo.fighter.armorLegs = this.getLegsArmor(armorId);
        console.log('playerTwo: Leg armor assigned')
      }
    }

  }

  private getHeadArmor(id: string): IArmor {
    for (const armor of this._armory.head) {
      if (armor.id === id) {
        // console.log('getHead: ' + armor.name + armor.armor + ' ' + 'protec:' + armor.protec);
        return armor;
      }
    }
  }

  private getTorsoArmor(id: string): IArmor {
    for (const armor of this._armory.torso) {
      if (armor.id === id) {
        // console.log('getTorso: ' + armor.name + armor.armor + ' ' + 'protec:' + armor.protec);
        return armor;
      }
    }
  }

  private getArmsArmor(id: string): IArmor {
    for (const armor of this._armory.arms) {
      if (armor.id === id) {
        // console.log('getArms: ' + armor.name + armor.armor + ' ' + 'protec:' + armor.protec);
        return armor;
      }
    }
  }

  private getLegsArmor(id: string): IArmor {
    for (const armor of this._armory.legs) {
      if (armor.id === id) {
        // console.log('getLegs: ' + armor.name + armor.armor + ' ' + 'protec:' + armor.protec);
        return armor;
      }
    }
  }

  // private getFighterIndex(id: string): number {
  //   let i = 0;
  //   for (const fighter of this.fighters) {
  //     if (player.id === id) {
  //       return i;
  //     }
  //     i++;
  //   }
  // }

}
