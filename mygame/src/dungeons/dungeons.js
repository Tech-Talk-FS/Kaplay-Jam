import { modal } from "./modal";

/**
 * 
 */
export const DUNGEONS = [
	[
		"Dungeon - 0",
		[
			"XXXXXX XXXXXX",
			"X           X",
			"X           X",
			"X           X",
			"XXXXXXXXX   X",
			"XXXXXXXXX   X",
			"XXXXXXXXX   X",
			"XXXXXXXXX   X",
		],
		[
			"[=======(===]",
			"[l         l]",
			"[ @      $  ]",
			"[           ]",
			",_______<   ]",
			"        [   ]",
			"        [   ]",
			"        [  V]",
			"        ,___."
		],
		[
			"    b",
			" l         l",
			"            ",
			"            ",
			"            ",
			"            ",
			"            ",
			"           X",
		],
		(lvl, orns, hud) => {
			const door = lvl.get('door')[0];
			door.interact = () => hud.immediateMsg("The door\nis stuck")
			for(const torch of lvl.get('torch')){
				torch.interact = () => hud.immediateMsg("This hasn't been\nlit in years");
			}
			const banner = orns.get('banner')[0];
			banner.interact = (player) => {
				hud.immediateMsg('Not all is as it seems"\n... ');
				const web = orns.get('web')[0];
				orns.remove(web);
				player.unlockedLvl1 = true;
			}
			const orn = lvl.get('right-wall-ornament')[0];
			orn.interact = (player) => {
				if(player.unlockedLvl1) go("main", 1);
			}
			hud.msg("...\n...\n...", "What?... Where am I?", "How did I get here")
		}
	],
	[
		"Dungeon - 1",
		[
			"XXXXXXXXX",
			"X        ",
			"X        ",
			"X        ",
			"X        ",
			"X        ",
			"X        ",
			"X        ",
			"X        ",
		],
		[
			"[========]",
			"[   @    ]",
			"[        ]",
			"[        ]",
			"[        ]",
			"[   $    ]",
			"[        ]",
			"[        ]",
			"[        ]",
			",________."
		],
		[
			"  b    b  "
		]

	]
]