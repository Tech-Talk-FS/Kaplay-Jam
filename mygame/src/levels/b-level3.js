import { interact } from "../objects";

export const bLevel3 = {
	title: "Dungeon - C2",
	floor: [
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
        "       ",
		"       ",
        "       ",
	],
	dungeon: [
		"[==(==]",
		"[J ~ J]",
		"[ w   ]",
		"[ z   ]",
		"[     ]",
        "[    W]",
        "[     ]",
        "[J   J]",
		",__(__."
	],
	ornaments: [
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
        "       ",
		"       ",
		"   @   ",
        "       ",
	],
	async setup() {
		const [topDoor, bottomDoor] = DM.dungeon.get('door');
		topDoor.interact = (player) => {DM.go(12)}
		bottomDoor.interact = (player) => {DM.go(10,0)}

		const smallPotion = DM.dungeon.get("small-health")[0];
		const largePotion = DM.dungeon.get("large-health")[0];
		if (DM.locals.tutorialSmallPotion) {
			smallPotion.destroy();
		} else {
			smallPotion.interact = (player) => {
				DM.player?.dialog(`This scent... This taste... I feel refreshed.`);
				player.increaseHealth(2);
				DM.locals.tutorialSmallPotion = true;
				smallPotion.destroy();
			}
		}

		if (DM.locals.tutorialLargePotion) {
			largePotion.destroy();
		} else {
			largePotion.interact = (player) => {
				DM.player?.dialog(`Such a potent mixture. I feel incredible!`);
				player.increaseHealth(8);
				DM.locals.tutorialLargePotion = true;
				largePotion.destroy();
			}
		}
	},
	tiles: {
	}
};