export function createTestEnemy() {
    const enemy = add([
        pos(center()),
        anchor("center"),
        rect(20, 20),
        area(),
        health(5),
    ]);

    enemy.onCollide("player_attack", (otherObj, collision) => {
        enemy.hurt(otherObj.is("damage") ? otherObj.damageAmount: 1);
    });

    enemy.onHurt(() => {
        if (enemy.hp() <= 0) {
            destroy(enemy);
        }
    });

    return enemy;
}