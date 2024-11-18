import { interact } from "../objects";
import { passedCollision } from "../objects/passedCollision";

export const jLevel1 = {
	title: "Servant Quarters",
	floor: [
		"XXXXXXXXXX",
		"X          ",
		"X         ",
		"X         ",
		"X         ",
		"X         ",
		"X         ",
		"X         ",
		"X         ",
		"X         ",
	],
	dungeon: [
		"[=9===><=)]",
		"[ ~   ][ ~?",
		"[  % #][  ]",
		"[  %  ][  ]",
		"[  %  ][  ]",
		"[ $ $ ][  ]",
		"[     ][  ]",
		"[ $ $ ][  ]",
		"[     ][  ]",
		"[ $ $M][  ]",
		",________(."
	],
	ornaments: [
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"         @",
	],
	tiles: {
		")": ()=>[
			interact(()=>DM.go(14, 1))
		],
		"(":()=>[
			interact(()=>DM.go(12, 0))
		],
		"M":()=>[
			passedCollision([
				'goblin-statue', 
				(_, __, obj) => {
					
					DM.locals.servantTilePressed = true;
					DM.player.dialog(`*KACHUNK*`,false);
					obj.destroy();
				}
			],[
				'player',
				() => DM.player.dialog(`*KACHUNK*`,false)
			])
		],
		"?":()=>[
			interact(player=>{
				player.dialog("Not ready yet check back later");
			})
		]
	}
}