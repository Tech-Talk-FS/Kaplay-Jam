export function createPlayer() {
    const SPEED = 120;
    const SPEED_MOD = 1.5;

    // Loading a multi-frame sprite
    // Each row is 9 cells wide, count for empty cells
    loadSprite("player", "/assests/Soldier/Soldier/Soldier.png", {
        // The image contains 9 frames layed out horizontally, slice it into individual frames
        sliceX: 9,
        sliceY: 7,
        // Define animations
        anims: {
            idle: {
                // Starts from frame 0, ends at frame 5
                from: 0,
                to: 5,
                // Frame per second
                speed: 3,
                loop: true,
            },
            run: {
                from: 9,
                to: 16,
                speed: 10,
                loop: true,
            },
            attack: {
                from: 18,
                to: 23,
                speed: 15,
            }
        },
    });

    // Creates the player sprite
    const player = add([
        sprite("player"),
        pos(center()),
        anchor("center"),
        area({
            shape: new Rect(vec2(0, -2), 13, 19)
        }),
        body(),
    ]);

    // Attaches attack hurtbox onto player
    const attack = player.add([
        named("player_attack"),
        anchor("left"),
        rotate(0),
        area({
            shape: new Rect(vec2(0, 0), 22, 23)
        }),
    ]);

    player.onButtonDown(["left", "right", "up", "down"], (button) => {
        let xMod = 0;
        let yMod = 0;
        // If the shift key is pressed, increase run speed
        let shiftMod = isKeyDown("shift") ? SPEED_MOD : 1;

        // Move and face character left if the "left" button is pressed
        if (button === "left") {
            xMod = -1;
            player.flipX = true;
            attack.rotateTo(180);
        }
        // Move and face character right if the "right" button is pressed
        else if (button === "right") {
            xMod = 1;
            player.flipX = false;
            attack.rotateTo(0);
        }

        // Move character up if the "up" button is pressed
        if (button === "up") {
            yMod = -1;
        }
        // Move character down if the "down" button is pressed
        else if (button === "down") {
            yMod = 1;
        }

        player.move(
            SPEED * shiftMod * xMod,
            SPEED * shiftMod * yMod
        );

        // If the animation isn't already playing, play the "run" animation
        if (player.getCurAnim()?.name !== "run" && player.getCurAnim()?.name !== "attack") {
            player.play("run");
        }
    });

    // Plays the attack animation when the "attack" button is held down.
    player.onButtonDown("attack", (button) => {
        if (player.getCurAnim()?.name !== button) {
            player.play(button);
        }
    })

    player.onUpdate(() => {
        attack.hidden = true;

        // If no movement button is pressed and no "attack" animation is playing,
        // play the "idle" animation
        if (player.getCurAnim()?.name !== "idle" &&
        player.getCurAnim()?.name !== "attack" &&
        !isButtonDown(["left", "right", "up", "down"])
        ) {
            player.play("idle");
        }
        
        // If the "attack" animation reaches the sword swipe section,
        // activate the attack hitbox.
        if (player.getCurAnim()?.name === "attack" &&
        (player.animFrame === 3 ||
        player.animFrame === 4)) {
            attack.hidden = false;
        }

        // Set camera to the player's position
        camPos(player.pos);
    });

    debug.inspect = true;

    return player;
}