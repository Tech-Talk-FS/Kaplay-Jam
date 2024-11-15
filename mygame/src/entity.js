export class Entity {
    health = 10;
    speed = 100;
    armor = 0;
    damage = 1;
    knockback = 0;
    gameObject = null;

    constructor({health,speed,armor,damage,knockback,gameObject} = {health: 10, speed: 100, armor: 0, damage: 1, knockback: 0, gameObject: null}) {
        this.health = health;
        this.speed = speed;
        this.armor = armor;
        this.damage = damage;
        this.knockback = knockback;
        this.gameObject = gameObject;
    }
}

export function entity({speed,armor,dir} = {speed: 100, armor: 0, dir: "Right"}) {
    return {
        id: "entity",
        require: ["health", "state", "damage"],
        speed,
        armor,
        dir,
    };
}