import { interact } from "../objects";

const cLevel10 = {
	title: "Dungeon - C9",
	floor: [
		"         ",
		"         ",
		"         ",
		"         ",
		"         ",
		"         ",
	],
	dungeon: [
		"[===(===]",
		"[   ~   ]",
		"/~     ~?",
		"[       ]",
		"[       ]",
		",___(___.",
	],
	ornaments: [
		"",
		"",
		"",
		"",
		"    @",
		"",
	],
	async setup() {
		const [topDoor, leftDoor, rightDoor, bottomDoor] = DM.dungeon.get('door');

		topDoor.interact = (player) => {
			//TODO: Provide index
			//DM.go();
			DM.player?.dialog(`"The kingdom's symbols
will reveal
the path.
With all five in tow, you will awaken."
What items could it mean...`)
		}

		leftDoor.interact = (player) => {
			DM.go(11);
		}

		rightDoor.interact = (player) => {
			DM.go(10);
		};

		bottomDoor.interact = (player) => {
			DM.go(8, 0);
		};
	},
	tiles: {
	}
};
export default cLevel10;