import { damage, interact } from "../objects";

export const blevel1 = {
  title: "Dungeon - C7",
  floor: [
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
    "               XXXXXXXXXXXXXXXXXXXXXXXXX",
    "                                        ",
    "                                        ",
    "                                        ",
    "             XXXXXXXXXXXXXXXXXXXXXXXX   ",
    "             XXXXXXXXXXXXXXXXXXXXXXXX   ",
  ],
  dungeon: [
    "[=======)=====]                         ",
    "[ e     ~ e   ]                         ",
    "[ $       $   =========================]",
    "/ ~                %    %              ]",
    "[                  %       %           ]",
    "[ $       $  >______________________<  ]",
    "[ E    $  E  ]                      [ @]",
    ",____________.                      ,_(.",
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
  tiles: {
    ")": ()=>[
      interact(()=>DM.go(13))
    ],
    "/": ()=>[
      interact(()=>DM.go(14))
    ],
    "(": ()=>[
      interact(()=>DM.go(11))
    ]
  }
};