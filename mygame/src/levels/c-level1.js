import { hazard, interact } from "../objects";

const cLevel1 = {
	title: "Dungeon - C0",
	floor: [
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
	],
	dungeon: [
		"[=====(=====]",
		"[l    ~    l]",
		"[           ]",
		"[  z  !     ]",
		"[           ]",
		"[           ]",
		"[         z ]",
		"[lz        l]",
		",___________."
	],
	ornaments: [
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"      @     ",
	],
	async setup() {
		if (!DM.locals.visitedLvl1) {
			DM.player?.dialog(`...
...
...
What?... Where am I?
How did I get here?`);
			DM.locals.visitedLvl1 = true;
		}
	},
	tiles: {
		"(": () => [
			interact(player=>DM.go(1))
		],
		"l": ()=>[
			interact(player => DM.player?.dialog(`Doesn't seem like it's been lit in years.`))
		],
		"!": ()=>[
			state('idle', ['idle', 'attack']),
			area(),
			hazard(1,1, 1.5)
		]
	}
}
export default cLevel1