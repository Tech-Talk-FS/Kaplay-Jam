import { damage, interact } from "../objects";

const level17 = {
  title: "Dungeon - C7",
  floor: [
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
    "                                        ",
    "                                        ",
    "                                        ",
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
  ],
  dungeon: [
    "[=======)=====]                        ]",
    "[ E       E   ]                         ",
    "[ $       $  ,=========================]",
    "/                  %    %        @    0]",
    "[                  %       %           ]",
    "[ $       $  ,________________________<]",
    "[ E    $  E  ]                         ]",
    ",____________.                         ]",
  ],
  ornaments: [
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
  ],
  async setup() {
    const [nDoor, wDoor] = DM.dungeon.get("door");

    nDoor.interact = (player) => {
          DM.go(14, 0);
    };

    wDoor.interact = (player) => {
       //   DM.go(9, 0);
    };

    // const [chest] = DM.dungeon.get("large-chest-1");

    // if (DM.locals.level11tutorialSwordChest) {
    //   chest.destroy();
    // } else {
    //   chest.interact = (player) => {
    //     DM.player?.dialog(`Just what i needed! \n 
			
	// 		Player gained new sword.`);
    //     DM.locals.level11tutorialSwordChest = true;
    //     chest.destroy();
    //     player.increaseDamage();
    //   };
    // }
  },
  tiles: {},
};
export default level17;