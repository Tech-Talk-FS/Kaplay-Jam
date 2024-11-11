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
			"[ @         ]",
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
		(lvl, orns) => {
			const door = lvl.get('door')[0];
			door.interact = () => modal(door, "The door\nis stuck", 2e3, 0, -16)
			for(const torch of lvl.get('torch')){
				torch.interact = () => modal(torch, "This hasn't been\nlit in years", 1e3)
			}
			const banner = orns.get('banner')[0];
			banner.interact = (player) => {
				modal(banner, '"Not all is as it seems"\n... ', 2e3, 0, -16)
				const web = orns.get('web')[0];
				orns.remove(web);
				player.unlockedLvl1 = true;
			}
			const orn = lvl.get('right-wall-ornament')[0];
			orn.interact = (player) => {
				if(player.unlockedLvl1) go("main", 1);
			}
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
			"[        ]",
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