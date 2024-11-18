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
			interact(()=>DM.go(13, 1))
		],
		"H":()=>[
			interact(()=>DM.go(16))
		]
	}
}