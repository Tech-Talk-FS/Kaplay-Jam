import { damage, interact } from "../objects";

const level11 = {
  title: "Dungeon - C7",
  floor: [
    "XXXXXXXXXXXXXXXXX               ",
    "XXXXXXXXXXXXXXXXX               ",
    "                                ",
    "                                ",
    "                                ",
    "XXXXXXXXXXXXXXXXX               ",
    "XXXXXXXXXXXXXXXXX               ",
  ],
  dungeon: [
    "                 [=======)=====]",
    "                 [        %    ]",
    "[================,            $]",
    "/@        %    $              S]",
    "[    % %   $                  $]",
    ",________________<   M         ]",
    "                 [ M         % ]",
    "                 ,_____________.",
  ],
  ornaments: [
    "                    b   b b  b  ",
    "                                ",
    "      lbl lbl lbl               ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
  ],
  async setup() {
    const [rightVDoor, rightRDoor] = DM.dungeon.get("door");

    rightVDoor.interact = (player) => {
      DM.go(11);
    };

    rightRDoor.interact = (player) => {
      DM.go(9, 0);
    };

    const [chest] = DM.dungeon.get("large-chest-1");

    if (DM.locals.level11tutorialSwordChest) {
      chest.destroy();
    } else {
      chest.interact = (player) => {
        DM.player?.dialog(`Just what i needed! \n 
			
			Player gained new sword.`);
        DM.locals.level11tutorialSwordChest = true;
        chest.destroy();
        player.increaseDamage();
      };
    }
  },
  tiles: {},
};
export default level11;