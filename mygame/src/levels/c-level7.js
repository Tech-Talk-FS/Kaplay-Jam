import { damage, interact } from "../objects";

const cLevel7 = {
  title: "Dungeon - C7",
  floor: [
    "XXXXXXXXXXXXXXXXXXXXXXXXX               ",
    "XXXXXXXXXXXXXXXXXXXXXXXXX               ",
    "                                        ",
    "                                        ",
    "                                        ",
    "XXXXXXXXXXXXXXXXXXXXXXXXX               ",
    "XXXXXXXXXXXXXXXXXXXXXXXXX               ",
  ],
  dungeon: [
    "                         [=======)=====]",
    "                         [        %    ]",
    "[========================,          $$$]",
    "/@            %        $              S]",
    "[    %    %        $                $$$]",
    ",________________________<   M         ]",
    "                         [ M         % ]",
    "                         ,_____________.",
  ],
  ornaments: [
    "                            b   b b  b  ",
    "                                        ",
    "      lbl lbl lbl lbl                   ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
  ],
  async setup() {
    const [rightVDoor, rightRDoor] = DM.dungeon.get("door");

    rightVDoor.interact = (player) => {
      DM.go(1, 0);
    };

    rightRDoor.interact = (player) => {
      DM.go(5, 0);
    };

    const [chest] = DM.dungeon.get("large-chest-1");

    if (DM.locals.tutorialSwordChest) {
      chest.destroy();
    } else {
      chest.interact = (player) => {
        DM.player?.dialog(`Just what i needed! \n 
			
			Player gained new sword.`);
        DM.locals.tutorialSwordChest = true;
        chest.destroy();
        player.increaseDamage();
      };
    }
  },
  tiles: {},
};
export default cLevel7;
