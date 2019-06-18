import { IWeapon, IArmor, IBody } from './';

export interface IFighter {
    name: string;
    id: string;
    class: string;
    hp: number;
    body: IBody;
    weaponLeft: IWeapon;
    weaponRight: IWeapon;
    armorHead: IArmor;
    armorLegs: IArmor;
    armorArms: IArmor;
    armorTorso: IArmor;
}