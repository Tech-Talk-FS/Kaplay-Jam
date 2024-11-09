export function createTestEnemy() {
    const enemy = add([
        pos(center()),
        anchor("center"),
        rect(20, 20),
        area(),
    ]);

    enemy.onCollide("player_attack", (otherObj, collision) => {
        if (!otherObj.hidden) {
            destroy(enemy);
        }
    });

    return enemy;
}