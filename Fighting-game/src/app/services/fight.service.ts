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

// Šitie du fighteriai yra dabar tik šiaip. Realiai visi fighteriai turėtų ateiti iš duomenų bazės?
// Mes dar čia nurodėme class, tai reikėtų jos modelį aprašyti ir apgalvoti, ką ji daro. Ir suimportuoti
// į IFighter?
// Turbūt reikia leftArm ir rightArm, nes skirtingi img turėtų būti naudojami, ar bent jau reverse.

  fighters: IFighter[] = [{
    name: 'Simas',
    id: '0',
    class: 'warrior',
    hp: 100,
    attack: 'none',
    defence: 'none',
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
      protec: 'arms',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      protec: 'legs',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      protec: 'torso',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      protec: 'head',
      criticalDmgCounter: 2,
      criticalDmg: 10,
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
    attack: 'none',
    defence: 'none',
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
      protec: 'arms',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      protec: 'legs',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      protec: 'torso',
      criticalDmgCounter: 2,
      criticalDmg: 10,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      protec: 'head',
      criticalDmgCounter: 2,
      criticalDmg: 10,
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

  public getFightersHP(id: string): number {
    return this.fighters[this.getFighterIndex(id)].hp;
  }

  public assignAttack(fighterId: string, bodyPart: string) {
    this.fighters[this.getFighterIndex(fighterId)].attack = bodyPart;
    console.log('attack ' + bodyPart);
  }

  public assignDefence(fighterId: string, bodyPart: string) {
    this.fighters[this.getFighterIndex(fighterId)].defence = bodyPart;
    console.log('defence ' + bodyPart);
  }

  // weaponRight.damage - because we always assign weapon to rightArm, even when it is twoHanded
  // For now we use Fighter Index to access objects from fighters Array. When we connect to DB we'll use
  // Fighter's unique id's (will add two parameters to function).
  // First we determine if attack hasn't been defended. Then we check armor.durability (if armor hasn't been destroyed)
  // And at the end we calculate damage delivered to fighter.hp and rewrite it in the object.
  private calculateCombat() {
    if (this.fighters[0].attack !== this.fighters[1].defence) {
      this.changeAttackedPartArmorDurability(0, 1);
      this.fighters[1].hp -= (this.fighters[0].weaponRight.damage - this.getAttackedPartArmor(0, 1));
    }
    if (this.fighters[1].attack !== this.fighters[0].defence) {
      this.changeAttackedPartArmorDurability(1, 0);
      this.fighters[0].hp -= (this.fighters[1].weaponRight.damage - this.getAttackedPartArmor(1, 0));
    }

  }

  // Different parts of fighters body can have different armor, thus we compare two strings from fighters[] objects
  // (attack and protec) to determin what kind of armor attacked body part has.
  private getAttackedPartArmor(attacingFighterIndex: number, deffendingFighterIndex: number): number {
    let armor = 0;
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorHead.protec) {
      armor = this.fighters[deffendingFighterIndex].armorHead.armor;
    } else if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorTorso.protec) {
      armor = this.fighters[deffendingFighterIndex].armorTorso.armor;
    } else if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorArms.protec) {
      armor = this.fighters[deffendingFighterIndex].armorArms.armor;
    } else if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorLegs.protec) {
      armor = this.fighters[deffendingFighterIndex].armorLegs.armor;
    } else {
      armor = 0;
    }
    return armor;
  }

  // Different armor has different durability (times it can be hit before it is destroyed).
  // NOTE: armor is destroyed only for the time of the combat, no changes are applyed to DB.
  // In future we could change how damaged body part looks (change svg).
  private changeAttackedPartArmorDurability(attacingFighterIndex: number, deffendingFighterIndex: number) {
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorHead.protec) {
      this.fighters[deffendingFighterIndex].armorHead.durability -= 1;
      if (this.fighters[deffendingFighterIndex].armorHead.durability < 0) {
        this.fighters[deffendingFighterIndex].armorHead.armor = 0;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorTorso.protec) {
      this.fighters[deffendingFighterIndex].armorTorso.durability -= 1;
      if (this.fighters[deffendingFighterIndex].armorTorso.durability < 0) {
        this.fighters[deffendingFighterIndex].armorTorso.armor = 0;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorArms.protec) {
      this.fighters[deffendingFighterIndex].armorArms.durability -= 1;
      if (this.fighters[deffendingFighterIndex].armorArms.durability < 0) {
        this.fighters[deffendingFighterIndex].armorArms.armor = 0;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorLegs.protec) {
      this.fighters[deffendingFighterIndex].armorLegs.durability -= 1;
      if (this.fighters[deffendingFighterIndex].armorLegs.durability < 0) {
        this.fighters[deffendingFighterIndex].armorLegs.armor = 0;
      }
    }
  }

  private changeCriticalCounterAndDmg(attacingFighterIndex: number, deffendingFighterIndex: number) {
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorHead.protec) {
      this.fighters[deffendingFighterIndex].armorHead.criticalDmgCounter -= 1;
      if (this.fighters[deffendingFighterIndex].armorHead.criticalDmgCounter < 0) {
        this.fighters[deffendingFighterIndex].armorHead.criticalDmg = 10;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorTorso.protec) {
      this.fighters[deffendingFighterIndex].armorTorso.criticalDmgCounter -= 1;
      if (this.fighters[deffendingFighterIndex].armorTorso.criticalDmgCounter < 0) {
        this.fighters[deffendingFighterIndex].armorTorso.criticalDmg = 10;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorArms.protec) {
      this.fighters[deffendingFighterIndex].armorArms.criticalDmgCounter -= 1;
      if (this.fighters[deffendingFighterIndex].armorArms.criticalDmgCounter < 0) {
        this.fighters[deffendingFighterIndex].armorArms.criticalDmg = 10;
      }
    }
    if (this.fighters[attacingFighterIndex].attack === this.fighters[deffendingFighterIndex].armorLegs.protec) {
      this.fighters[deffendingFighterIndex].armorLegs.criticalDmgCounter -= 1;
      if (this.fighters[deffendingFighterIndex].armorLegs.criticalDmgCounter < 0) {
        this.fighters[deffendingFighterIndex].armorLegs.criticalDmg = 10;
      }
    }
  }

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
