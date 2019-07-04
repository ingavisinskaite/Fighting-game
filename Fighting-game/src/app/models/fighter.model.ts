import { IWeapon, IArmor } from '.';

export interface IFighter {
    name: string;
    class: string;
    hp: number;
    attack: string;
    defence: string;
    weaponRight: IWeapon;
    weaponLeft: IWeapon;
    armorHead: IArmor;
    armorTorso: IArmor;
    armorArms: IArmor;
    armorLegs: IArmor;
}
