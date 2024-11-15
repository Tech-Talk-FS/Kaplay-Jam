export function damage(damageAmount=1) {
    return {
        id :"damage",
        damageAmount,
        inspect() {
            return `damage: ${damageAmount}`;
        },
    }
    
}