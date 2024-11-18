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
		"[   ~   ]",
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

		if(DM.destination === 3) DM.player?.dialog(`... This cant be right. How did I get here`);
		topDoor.interact = (player) => {
			//TODO: Provide index
			//DM.go();
			if(DM.locals.silverKey && DM.locals.goldenKey && DM.locals.hasOathRing) return DM.go(22)
			DM.player?.dialog(`"The kingdom's symbols
will reveal
the path.
With all five in tow, you will awaken."
What items could it mean...`)
		}

		leftDoor.interact = (player) => {
			DM.go(15);
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