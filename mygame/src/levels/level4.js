import { interact, hazard } from "../objects";

const Level4 = {
    title: "Dungeon - skelton room",

floor: [
    "XXXXXXXXXXXXXXXX",
    "X              X",
    "X              X",
    "X              X",
    "X              X",
    "X              X",
    "X              X",
    "X              X",
    "XXXXXXXXXXXXXXXX",
],

dungeon: [
    "[=====)=======]",
    "[  !        ! ]",
    "[   !     !   ]",
    "[  $    $     ]",
    "[   !   !     ]",
    "[  $     $    ]",
    "[   !     !   ]",
    "[  !       !  ]",
    "[(____________]"
],

ornaments: [
    "               ",
    "               ",
    "               ",
    "               ",
    "    @          ",
    "               ",
    "               ",
    "               ",
],

    async setup() {
        // Display banner text when the player enters the room
        DM.player?.dialog(
            `"Only the dark can light your way...\nBut beware, the dark harbors danger."`
        );

        // Door mechanics
        const doors = DM.dungeon.get('door');
        if (doors) {
            const rightDoor = doors.find((door) => door.id === 'right-door');
            const bottomDoor = doors.find((door) => door.id === 'bottom-door');

            if (rightDoor) {
                rightDoor.interact = (player) => {
                    if (DM.locals.fireLevelAllSkeletonsDead) {
                        DM.go(5); // Move to Level 5
                    } else {
                        DM.player?.dialog("The door won't budge... Something still lurks.");
                    }
                };
            }

            if (bottomDoor) {
                bottomDoor.interact = (player) => {
                    DM.go(0); // Move to Level 0
                };
            }
        }

        // Torch mechanics
        const torches = DM.dungeon.get('torch');
        const skeletons = DM.dungeon.get('$') || []; // Ensure skeletons array exists

        if (!DM.locals.allTorchesDestroyed) {
            torches.forEach((torch) => {
                torch.interact = (player) => {
                    DM.player?.dialog("Ouch! It's hot!");
                    torch.destroy();
                    DM.locals.torchDestroyedCount = (DM.locals.torchDestroyedCount || 0) + 1;

                    if (DM.locals.torchDestroyedCount === torches.length) {
                        DM.locals.allTorchesDestroyed = true;

                        // Unhide and activate skeletons
                        skeletons.forEach((skeleton) => {
                            skeleton.hidden = false;
                            skeleton.paused = false;
                        });

                        DM.player?.dialog("The room grows eerily silent...");
                    }
                };
            });

            // Initially hide skeletons
            skeletons.forEach((skeleton) => {
                skeleton.hidden = true;
                skeleton.paused = true;
            });
        } else {
            // If torches are already destroyed, ensure skeletons are active
            skeletons.forEach((skeleton) => {
                skeleton.hidden = false;
                skeleton.paused = false;
            });
        }

        // Skeleton behavior and key drop logic
        skeletons.forEach((skeleton) => {
            skeleton.onDeath(() => {
                if (!skeleton.pos) {
                    console.error("Skeleton's position is undefined.");
                    return; // Skip if position is invalid
                }

                // Drop a key where the skeleton dies
                DM.tiles["k"]({
                    pos: skeleton.pos,
                });

                DM.locals.skeletonDeadCount = (DM.locals.skeletonDeadCount || 0) + 1;

                if (DM.locals.skeletonDeadCount === skeletons.length) {
                    DM.locals.fireLevelAllSkeletonsDead = true;
                    DM.player?.dialog(
                        `"The room feels eerily quiet...\n\n...Click, it sounds like a door unlocked."`
                    );
                }
            });
        });
    },

    tiles: {
        "!": () => [
            area(),
            state('idle', ['idle', 'attack']),
            hazard(0, 1, 3) // 1 damage, 0 knockback, 3-second attack delay
        ],

        "(": () => [
            interact(player => {
                DM.player?.dialog(`The door is stuck.`);
                DM.go(6);
            })
        ],

        ")": () => [
            interact(player => {
                DM.player?.dialog(`This door leads down.`);
                DM.go(8);
            })
        ],

        "$": () => [
            interact(player => {
                // Skeleton tile interaction logic if needed
            })
        ],

        "k": () => [
            interact(player => {
                DM.player?.dialog("You picked up a key!");
                DM.locals.hasIronKey = true; // Set the key acquisition flag
            })
        ]
    }
};

export default Level4;