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
		"9":()=>[
			interact(()=>DM.go(14,0))
		],
		"M":()=>[
			passedCollision([
				'goblin-statue', 
				(_, __, obj) => {
					DM.locals.hasOathRing = true;
					DM.player.dialog(`*KACHUNK*
...
...
The statues mouth slowly opens.
Revealing an ornate ring.
`,false);
					obj.destroy();
					
				}
			],[
				'player',
				() => DM.player.dialog(`*KACHUNK*`,false)
			])
		],
		"?":()=>[
			interact(player=>{
				if(DM.locals.hasOathRing) DM.go(15);
				player.dialog("This door is stuck");
			})
		]
	}
}