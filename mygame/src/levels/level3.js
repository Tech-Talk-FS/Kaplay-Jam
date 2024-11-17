import { interact, hazard } from "../objects";

const Level3 = {
    title: "Dungeon - 2",

    floor: [
        "XXXXXXXXXXXXXXX",
        "X             X",
        "X             X",
        "X             X",
        "X             X",
        "X             X",
        "X             X",
        "X             X",
        "XXXXXXXXXXXXXXX",
    ],

    dungeon: [
        "[=====)======]",
        "[  z         ]",
        "[ !!     !   ]",
        "[  !    !!   ]",
        "[  !!  z  !  ]",
        "[  !      !  ]",
        "[  !!    Z   ]",
        "[     zz     ]",
        "[(,__________."
    ],

    ornaments: [
        "             ",
        "              ",
        "              ",
        "              ",
        "              ",
        "              ",
        " @            ",
        "              ",
    ],

    async setup() {
        try {
            if (DM.player?.dialog) {
                DM.player.dialog(
                    `I can smell smoke... 
                    Where am I? 
                    What is happening? 
                    Is this... FIRE!?`
                );
            }
        } catch (error) {
            console.error("Error during setup of Fire Level 1:", error);
        }
    },

    tiles: {
        "!": () => [
            area(),
            state('idle', ['idle', 'attack']),
    //        hazard(1, 0, 3)
        ],

"(": () => [
    interact(player => {
        if (player && player.dialog) {
            player.dialog("This door leads back the way i came");
            const desiredLevel = 2;  // Ensure that the desired level index exists
            DM.go(desiredLevel);  // Move to the next level (ensure DM.go is properly implemented)
        }
    })
],
//door player spawns away from
")": () => [
    interact(player => {
        if (player && player.dialog) {
            player.dialog("This door leads down");
            const desiredLevel = 0;  // Ensure that the desired level index exists
            DM.go(desiredLevel);  // Move to the next level (ensure DM.go is properly implemented)
        }
    })
]


    }
};

export default Level3;