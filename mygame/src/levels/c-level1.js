import { interact } from "../objects";

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
		"[  z        ]",
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
		]
	}
}
export default cLevel1