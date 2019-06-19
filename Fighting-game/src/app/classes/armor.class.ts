import { IArmor } from '../models';

export class Armory {

    head: IArmor[] = [{
        protec: 'head',
        name: 'Leather Helmet',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/head.svg'
    },
    {
        protec: 'head',
        name: 'Iron Helmet',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/head.svg'
    }];

    torso: IArmor[] = [{
        protec: 'torso',
        name: 'Leather Vest',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/torso.svg'
    },
    {
        protec: 'torso',
        name: 'Chainmail Vest',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/torso.svg'
    }];

    arms: IArmor[] = [{
        protec: 'arms',
        name: 'Leather Greaves',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/arms.svg'
    },
    {
        protec: 'arms',
        name: 'Chainmail Greaves',
        id: '1',
        armor: 20,
        durability: 10,
        image: './assets/images/body/arms.svg'
    }];

    legs: IArmor[] = [{
        protec: 'legs',
        name: 'Leather Pants',
        id: '0',
        armor: 5,
        durability: 2,
        image: './assets/images/body/legs.svg'
    },
    {
        protec: 'legs',
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
