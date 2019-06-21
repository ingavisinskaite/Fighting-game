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
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      protec: 'legs',
      criticalDmgCounter: 2,
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      protec: 'torso',
      criticalDmgCounter: 2,
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      protec: 'head',
      criticalDmgCounter: 2,
      criticalDmg: 0,
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
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/arms.svg'
    },
    armorLegs: {
      protec: 'legs',
      criticalDmgCounter: 2,
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/legs.svg'
    },
    armorTorso: {
      protec: 'torso',
      criticalDmgCounter: 2,
      criticalDmg: 0,
      name: 'none',
      id: '0',
      armor: 0,
      durability: 0,
      image: './assets/images/body/torso.svg'
    },
    armorHead: {
      protec: 'head',
      criticalDmgCounter: 2,
      criticalDmg: 0,
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


  // If fighter1.attack === fighter2.defence { attack is blocked and no harm is done }
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
  public calculateCombat(fighterOneId: string, fighterTwoId: string) {
    if (this.fighters[this.getFighterIndex(fighterOneId)].attack !==
      this.fighters[this.getFighterIndex(fighterTwoId)].defence) {
      this.changeAttackedPartArmorDurability(fighterOneId, fighterTwoId);
      this.changeCriticalCounterAndDmg(fighterOneId, fighterTwoId);
      this.fighters[this.getFighterIndex(fighterTwoId)].hp -=
      (this.fighters[this.getFighterIndex(fighterOneId)].weaponRight.damage +
      this.getCriticalDmg(fighterOneId, fighterTwoId) - this.getAttackedPartArmor(fighterOneId, fighterTwoId));
    }
    if (this.fighters[this.getFighterIndex(fighterTwoId)].attack !==
      this.fighters[this.getFighterIndex(fighterOneId)].defence) {
      this.changeAttackedPartArmorDurability(fighterTwoId, fighterOneId);
      this.changeCriticalCounterAndDmg(fighterTwoId, fighterOneId);
      this.fighters[this.getFighterIndex(fighterOneId)].hp -=
      (this.fighters[this.getFighterIndex(fighterTwoId)].weaponRight.damage +
      this.getCriticalDmg(fighterTwoId, fighterOneId) - this.getAttackedPartArmor(fighterTwoId, fighterOneId));
    }

  }


  // Different parts of fighters body can have different armor, thus we compare two strings from fighters[] objects
  // (attack and protec) to determin what kind of armor attacked body part has.
  private getAttackedPartArmor(attackingFighterId: string, defendingFighterId: string): number {
    let armor = 0;
    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
    this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.protec) {
      armor = this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.armor;
      console.log('attacked part armor')
      console.log('fighter name: ' + this.fighters[this.getFighterIndex(defendingFighterId)].name + ' head armor ' + armor)
    } else if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
    this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.protec) {
      armor = this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.armor;
      console.log('attacked part armor')
      console.log('fighter name: ' + this.fighters[this.getFighterIndex(defendingFighterId)].name + ' torso armor: ' + armor)
    } else if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
    this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.protec) {
      armor = this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.armor;
      console.log('attacked part armor')
      console.log('fighter name: ' + this.fighters[this.getFighterIndex(defendingFighterId)].name + ' torso armor: ' + armor)
    } else if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
    this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.protec) {
      armor = this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.armor;
      console.log('attacked part armor')
      console.log('fighter name: ' + this.fighters[this.getFighterIndex(defendingFighterId)].name + ' legs armor: ' + armor)
    } else {
      armor = 0;
    }
    return armor;
  }

  private getCriticalDmg(attackingFighterId: string, defendingFighterId: string): number {
    let dmg = 0;

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.protec) {
      dmg = this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.criticalDmg;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' head crit dmg: ' + dmg)
      return dmg;
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.protec) {
      dmg = this.fighters[this.getFighterIndex(attackingFighterId)].armorTorso.criticalDmg;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' torso crit dmg: ' + dmg)
      return dmg;
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.protec) {
      dmg = this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.criticalDmg;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' arms crit dmg: ' + dmg)
      return dmg;
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.protec) {
      dmg = this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.criticalDmg;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' legs crit dmg: ' + dmg)
      return dmg;
    }
  }

  // Different armor has different durability (times it can be hit before it is destroyed).
  // NOTE: armor is destroyed only for the time of the combat, no changes are applyed to DB.
  // In future we could change how damaged body part looks (change svg).
  private changeAttackedPartArmorDurability(attackingFighterId: string, defendingFighterId: string) {

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.durability -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' head armor dur: ' +
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.durability)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.durability < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.armor = 0;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.durability -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' torso armor dur: ' +
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.durability)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.durability < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.armor = 0;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.durability -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' arms armor dur: ' +
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.durability)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.durability < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.armor = 0;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.durability -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' legs armor dur: ' +
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.durability)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.durability < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.armor = 0;
      }
    }
  }

  private changeCriticalCounterAndDmg(attackingFighterId: string, defendingFighterId: string) {

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
    this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.criticalDmgCounter -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' head crit counter ' + 
      this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.criticalDmgCounter)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.criticalDmgCounter < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorHead.criticalDmg += 5;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.criticalDmgCounter -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' torso crit counter ' + 
      this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.criticalDmgCounter)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.criticalDmgCounter < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorTorso.criticalDmg += 5;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.criticalDmgCounter -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' arms crit counter ' + 
      this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.criticalDmgCounter)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.criticalDmgCounter < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorArms.criticalDmg += 5;
      }
    }

    if (this.fighters[this.getFighterIndex(attackingFighterId)].attack ===
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.protec) {
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.criticalDmgCounter -= 1;

      console.log(this.fighters[this.getFighterIndex(defendingFighterId)].name + ' legs crit counter ' + 
      this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.criticalDmgCounter)

      if (this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.criticalDmgCounter < 0) {
        this.fighters[this.getFighterIndex(defendingFighterId)].armorLegs.criticalDmg += 5;
      }
    }
  }

  public assignWeapon(fighterId: string, weaponId: string, oneHanded: boolean) {
    if (oneHanded) {
      this.fighters[this.getFighterIndex(fighterId)].weaponRight = this.getOneHandedWeapon(weaponId);
      console.log('assign weapon')
      console.log(this.fighters[this.getFighterIndex(fighterId)].weaponRight.name + this.fighters[this.getFighterIndex(fighterId)].weaponRight.damage)
    } else {
      this.fighters[this.getFighterIndex(fighterId)].weaponLeft = this.getTwoHandedWeapon(weaponId);
      this.fighters[this.getFighterIndex(fighterId)].weaponRight = this.getTwoHandedWeapon(weaponId);
      console.log('assign weapon')
      console.log(this.fighters[this.getFighterIndex(fighterId)].weaponRight.name + this.fighters[this.getFighterIndex(fighterId)].weaponRight.damage)
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

  public assignArmor(fighterId: string, armorId: string, protec: string) {
    if (protec === 'head') {
      this.fighters[this.getFighterIndex(fighterId)].armorHead = this.getHeadArmor(armorId);
      console.log('armor: ' + this.fighters[this.getFighterIndex(fighterId)].armorHead.armor)
      console.log('fighterName: ' + this.fighters[this.getFighterIndex(fighterId)].name)
      console.log('id: ' + armorId + ' protec: ' + protec)
      console.log('armor assigned')
    } 
    if (protec === 'torso') {
      this.fighters[this.getFighterIndex(fighterId)].armorTorso = this.getTorsoArmor(armorId);
      console.log('armor: ' + this.fighters[this.getFighterIndex(fighterId)].armorTorso.armor)
      console.log('fighterName: ' + this.fighters[this.getFighterIndex(fighterId)].name)
      console.log('id: ' + armorId + ' protec: ' + protec)
      console.log('armor assigned')
    } 
    if (protec === 'arms') {
      this.fighters[this.getFighterIndex(fighterId)].armorArms = this.getArmsArmor(armorId);
      console.log('armor: ' + this.fighters[this.getFighterIndex(fighterId)].armorArms.armor)
      console.log('fighterName: ' + this.fighters[this.getFighterIndex(fighterId)].name)
      console.log('id: ' + armorId + ' protec: ' + protec)
      console.log('armor assigned')
    } 
    if (protec === 'legs') {
      this.fighters[this.getFighterIndex(fighterId)].armorLegs = this.getLegsArmor(armorId);
      console.log('armor: ' + this.fighters[this.getFighterIndex(fighterId)].armorLegs.armor)
      console.log('fighterName: ' + this.fighters[this.getFighterIndex(fighterId)].name)
      console.log('id: ' + armorId + ' protec: ' + protec)
      console.log('armor assigned')
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

  private getFighterIndex(id: string): number {
    let i = 0;
    for (const fighter of this.fighters) {
      if (fighter.id === id) {
        return i;
      }
      i++;
    }
  }


  // public getDamage(id: string, oneHanded: boolean): number {
  //   let damage = 0;
  //   if (oneHanded === true) {
  //     damage = this.getOneHandedDamage(id);
  //     return damage;
  //   } else {
  //     damage = this.getTwoHandedDamage(id);
  //     return damage;
  //   }
  // }

  // private getOneHandedDamage(id: string): number {
  //   for (const weapon of this._weaponry.oneHanded) {
  //     if (weapon.id === id) {
  //       return weapon.damage;
  //     }
  //   }
  // }

  // private getTwoHandedDamage(id: string): number {
  //   for (const weapon of this._weaponry.twoHanded) {
  //     if (weapon.id === id) {
  //       return weapon.damage;
  //     }
  //   }
  // }
}
