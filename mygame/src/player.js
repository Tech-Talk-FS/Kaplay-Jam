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
        jump: {
            from: 27,
            to: 29,
            speed: 10,
            loop: false,
        },
        },
    });

    const player = add([
        sprite("player"),
        pos(center()),
        anchor("center"),
        area(),
        body(),
    ]);

    // .play is provided by sprite() component, it starts playing the specified animation (the animation information of "idle" is defined above in loadSprite)
    player.play("idle");

    player.onButtonDown(["left", "right", "up", "down"], (button) => {
        let xMod = 0;
        let yMod = 0;
        // If the shift key is pressed, increase run speed
        let shiftMod = isKeyDown("shift") ? SPEED_MOD : 1;

        // Move and face character left if the "left" button is pressed
        if (button === "left") {
            xMod = -1;
            player.flipX = true;
        }
        // Move and face character right if the "right" button is pressed
        else if (button === "right") {
            xMod = 1;
            player.flipX = false;
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
        if (player.getCurAnim().name !== "run") {
            player.play("run");
        }
    });

    player.onUpdate(() => {
        // If no movement button is pressed, play the "idle" animation
        if (player.getCurAnim().name !== "idle" && !isButtonDown(["left", "right", "up", "down"])) {
            player.play("idle");
        }
        camPos(player.pos);
    });

    return player;
}