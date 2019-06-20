import { IWeapon, IArmor } from '.';

export interface IFighter {
    name: string;
    id: string;
    class: string;
    hp: number;
    attack: string;
    defence: string;
    weaponLeft: IWeapon;
    weaponRight: IWeapon;
    armorHead: IArmor;
    armorLegs: IArmor;
    armorArms: IArmor;
    armorTorso: IArmor;
}
