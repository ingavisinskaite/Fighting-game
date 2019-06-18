import { IArmor } from '../models';

export class Armory {

    head: IArmor[] = [{
        name: 'Leather Helmet',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/head.svg'
    },
    {
        name: 'Iron Helmet',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/head.svg'
    }];

    torso: IArmor[] = [{
        name: 'Leather Vest',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/torso.svg'
    },
    {
        name: 'Chainmail Vest',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/torso.svg'
    }];

    arms: IArmor[] = [{
        name: 'Leather Greaves',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/arms.svg'
    },
    {
        name: 'Chainmail Greaves',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/arms.svg'
    }];

    legs: IArmor[] = [{
        name: 'Leather Pants',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/legs.svg'
    },
    {
        name: 'Chainmail Pants',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/legs.svg'
    }];

    get headArmor(): IArmor[] {
        return this.head;
    }

    get torsoArmor(): IArmor[] {
        return this.torso;
    }

    get armsArmor(): IArmor[] {
        return this.arms;
    }

    get legsArmor(): IArmor[] {
        return this.legs;
    }
}
