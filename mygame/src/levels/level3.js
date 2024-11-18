import { interact, hazard } from "../objects";
const AMULET_DIALOG = `This amulet
I know this amulet.
Flashes of memories of an ancient battle came crashing back as you pick up the amulet. 
Your sword changes taking on a more lethal form. 
...
Who am I?... Do I want to know?`;
const Level3 = {
    title: "Scorched Ball Room",

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
        "[  z  ~      ]",
        "[ !!     ! $ ]",
        "[  !  $ !! n ]",
        "[  !!  z  !  ]",
        "[  !  $   !  ]",
        "[  !!    Z   ]",
        "[     zz   $ ]",
        "[(___________."
    ],

    ornaments: [
        "              ",
        "              ",
        "              ",
        "           M  ",
        "              ",
        "              ",
        " @            ",
        "              ",
    ],

    async setup() {
        if(DM.locals.destination !== undefined) return;
        DM.player.dialog(
`I can smell smoke... 
Where am I? 
What is happening? 
Is this... FIRE!?`, false);
    },

    tiles: {
        "!": () => [
            area(),
            state('idle', ['idle', 'attack']),
            hazard(1, 0, 3)
        ],

        "(": () => [
            interact(player => {
                DM.go(11, 0);
            })
        ],
        //door player spawns away from
        ")": () => [
            interact(player => {
                DM.go(13)
            })
        ],
        "n": () => [
            interact(player => {
                if(DM.locals.gotScorchedAmulet) return;
                DM.locals.gotScorchedAmulet = true;
                player.dialog(AMULET_DIALOG);
                player.increaseDamage();

            }, true)
        ]
    }
};

export default Level3;