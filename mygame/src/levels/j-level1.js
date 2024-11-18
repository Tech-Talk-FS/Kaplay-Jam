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
			interact(()=>DM.go(18, 1))
		],
		"(":()=>[
			interact(()=>DM.go(16, 0))
		],
		"9":()=>[
			interact(()=>DM.go(18,0))
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
...
"Do you swear to protect the people of these lands"
...
"I do!"
...
It cant be... am I... a Knight?`,false);
					obj.destroy();
					
				}
			],[
				'player',
				() => DM.player.dialog(`*KACHUNK*`,false)
			])
		],
		"?":()=>[
			interact(player=>{
				if(DM.locals.hasOathRing) DM.go(20);
				player.dialog("This door is stuck");
			})
		]
	}
}