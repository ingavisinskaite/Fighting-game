import { IBody } from './../model/body.model';
import { Armory } from './../classes/armor.class';
import { IArmor } from './../model/armor.model';
import { IWeapon } from './../model/weapon.model';
import { Weaponry } from './../classes/weapons.class';
import { Injectable } from '@angular/core';
import { IFighter } from '../model';


@Injectable({
  providedIn: 'root'
})

export class FightService {

// Šitie du fighteriai yra dabar tik šiaip. Realiai visi fighteriai turėtų ateiti iš duomenų bazės?
// Mes dar čia nurodėme class, tai reikėtų jos modelį aprašyti ir apgalvoti, ką ji daro. Ir suimportuoti
// į IFighter?
// Turbūt reikia leftArm ir rightArm, nes skirtingi img turėtų būti naudojami, ar bent jau reverse.

  fighters: IFighter[] = [{
    name: 'Simas',
    id: '0',
    class: 'warrior',
    hp: 100,
    body: {
      head: true,
      torso: true,
      legs: true,
      arms: true
    },
    weaponLeft: {
      name: 'Fists',
      id: '0',
      damage: 10,
      oneHanded: true,
      image: 'Fists.svg'
    },
    weaponRight: {
      name: 'Fists',
      id: '0',
      damage: 10,
      oneHanded: true,
      image: 'Fists.svg'
    },
    armorArms: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/head.svg'
    }
  },
  {
    name: 'Zbignev',
    id: '1',
    class: 'warrior',
    hp: 100,
    body: {
      head: true,
      torso: true,
      legs: true,
      arms: true
    },
    weaponLeft: {
      name: 'Fists',
      id: '0',
      damage: 10,
      oneHanded: true,
      image: 'fists.svg'
    },
    weaponRight: {
      name: 'Fists',
      id: '0',
      damage: 10,
      oneHanded: true,
      image: 'fists.svg'
    },
    armorArms: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/head.svg'
    }
  }];

  constructor(private _weaponry: Weaponry,
              private _armory: Armory) { }

  public initFighters() {
    // should init the fighters
    // get data from firebase etc.
  }

  // public getFightersHP(id: string): number {
  //   for (const fighter of this.fighters) {
  //     if (fighter.id === id) {
  //       console.log(fighter.hp);
  //       return fighter.hp;
  //     }
  //   }
  // }

  public assignWeapon(fighterId: string, weaponId: string, oneHanded: boolean) {
    if (oneHanded) {
      this.fighters[this.getFighterIndex(fighterId)].weaponRight = this.getOneHandedWeapon(weaponId);
    } else {
      this.fighters[this.getFighterIndex(fighterId)].weaponLeft = this.getTwoHandedWeapon(weaponId);
      this.fighters[this.getFighterIndex(fighterId)].weaponRight = this.getTwoHandedWeapon(weaponId);
    }
  }

  private getOneHandedWeapon(id: string): IWeapon {
    for (const weapon of this._weaponry.oneHanded) {
      if (weapon.id === id) {
        console.log(weapon.name + weapon.damage);
        return weapon;
      }
    }
  }

  private getTwoHandedWeapon(id: string): IWeapon {
    for (const weapon of this._weaponry.twoHanded) {
      if (weapon.id === id) {
        console.log(weapon.name + weapon.damage);
        return weapon;
      }
    }
  }

  public getDamage(id: string, oneHanded: boolean): number {
    let damage = 0;
    if (oneHanded === true) {
      damage = this.getOneHandedDamage(id);
      return damage;
    } else {
      damage = this.getTwoHandedDamage(id);
      return damage;
    }
  }

  private getOneHandedDamage(id: string): number {
    for (const weapon of this._weaponry.oneHanded) {
      if (weapon.id === id) {
        return weapon.damage;
      }
    }
  }

  private getTwoHandedDamage(id: string): number {
    for (const weapon of this._weaponry.twoHanded) {
      if (weapon.id === id) {
        return weapon.damage;
      }
    }
  }

  public assignArmor(fighterId: string, armorId: string) {
    this.fighters[this.getFighterIndex(fighterId)].armorHead = this.getHeadArmor(armorId);
    this.fighters[this.getFighterIndex(fighterId)].armorTorso = this.getTorsoArmor(armorId);
    this.fighters[this.getFighterIndex(fighterId)].armorArms = this.getArmsArmor(armorId);
    this.fighters[this.getFighterIndex(fighterId)].armorLegs = this.getLegsArmor(armorId);
  }

  private getHeadArmor(id: string): IArmor {
    for (const armor of this._armory.head) {
      if (armor.id === id) {
        console.log(armor.name + armor.armor);
        return armor;
      }
    }
  }

  private getTorsoArmor(id: string): IArmor {
    for (const armor of this._armory.torso) {
      if (armor.id === id) {
        console.log(armor.name + armor.armor);
        return armor;
      }
    }
  }

  private getArmsArmor(id: string): IArmor {
    for (const armor of this._armory.arms) {
      if (armor.id === id) {
        console.log(armor.name + armor.armor);
        return armor;
      }
    }
  }

  private getLegsArmor(id: string): IArmor {
    for (const armor of this._armory.legs) {
      if (armor.id === id) {
        console.log(armor.name + armor.armor);
        return armor;
      }
    }
  }

  private getFighterIndex(id: string): number {
    let i = 0;
    for (const fighter of this.fighters) {
      if (fighter.id === id) {
        return i;
      }
      i++;
    }
  }

}
