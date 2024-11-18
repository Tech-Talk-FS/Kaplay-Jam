import { interact } from "../objects";

export const jLevel3 = {
	title: "Guard Tower",
	floor: [
		"XXXXXX",
		"X     ",
		"X     ",
		"X     ",
		"X     ",
	],
	dungeon: [
		"[=====]",
		"/     ]",
		"[     ]",
		"[  H  ]",
		"[     ]",
		",_____."
	],
	ornaments: [
		"",
		"",
		"  @"
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