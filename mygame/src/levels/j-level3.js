import { interact } from "../objects";

export const jLevel3 = {
	title: "Guard Tower",
	floor: [
		"XXXX",
		"X   ",
		"X   ",
		"X   ",
	],
	dungeon: [
		"[===]",
		"/   ]",
		"[ H ]",
		"[   ]",
		",___."
	],
	ornaments: [
		"",
		" @"
	],
	tiles: {
		"/":()=>[
			interact(()=>DM.go(17, 1))
		],
		"H":()=>[
			interact(()=>DM.go(20))
		]
	}
}