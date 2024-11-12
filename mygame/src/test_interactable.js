export function createTestInteractable() {
    const interactable = add([
        pos(center().x + 30, center().y),
        circle(5),
        area(),
    ]);

    interactable.onCollideUpdate("player_interact", (otherObj) => {
        if(isButtonPressed("interact")) {
            get("player")[0].trigger("upgrade", "speed", 2);
            destroy(interactable);
        }
    });

    return interactable;
}