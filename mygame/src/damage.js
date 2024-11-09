export function damage(damageAmount) {
    let damage = damageAmount;

    return {
        id :"damage",
        damage() {
            return damage;
        },
        inspect() {
            return `damage: ${damage}`;
        },
    }
}