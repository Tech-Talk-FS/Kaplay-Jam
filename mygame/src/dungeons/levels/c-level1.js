const cLevel1 = [
	"Dungeon - C0",
	[
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
		"             ",
	],
	[
		"[=====(=====]",
		"[l         l]",
		"[           ]",
		"[  z        ]",
		"[           ]",
		"[           ]",
		"[         z ]",
		"[lz        l]",
		",___________."
	],
	[
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"      @     ",
	],
	async () => {
		const door = DM.dungeon.get('door')[0];
		door.interact = (player) => {
			go("main", 1);
		}
		DM.player?.dialog(
`...
...
...
What?... Where am I?
How did I get here?
`);
	}
];
export default cLevel1