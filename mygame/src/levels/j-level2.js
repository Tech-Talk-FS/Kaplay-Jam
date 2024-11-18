import { hazard, interact } from "../objects";

export const jLevel2 = {
	title: "Scorched Hall",
	floor: [
		"XXXXXXXXXX",
		"X         ",
		"X         ",
		"X         ",
		"X   XXX   ",
		"X   XXX   ",
		"X   XXX   ",
		"X   XXX   ",
		"X   XXX   ",
		"X   XXX   ",
	],
	dungeon: [
		"[=========]",
		"[     %   ]",
		"[   % ! % ]",
		"[t T>_<t T]",
		"[!  ] [  !]",
		"[  T] [t !]",
		"[!  ] [   ]",
		"[  T] [t  ]",
		"[  !] [!  ]",
		"[  T] [t  ]",
		",)_______(."
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
		"         @"
	],
	tiles: {
		"!": ()=>[
			area(),
			state('idle', ['idle','attack']),
			hazard(1, 10, 1.5)
		],
		"(": ()=>[
			interact(()=>DM.go(13, 1))
		],
		")": ()=>[
			interact(()=>{DM.go(13, 0)})
		]
	},
	setup(){
		const [torch] = DM.dungeon.get('left-torch');
		torch.interact = player => {
			player.dialog(`A mystical force imbues my blade with the might of the torches fire`)
		}
	}
}