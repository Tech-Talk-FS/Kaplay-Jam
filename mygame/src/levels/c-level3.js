import { interact } from "../objects";

const cLevel3 = {
	title: "Dungeon - C2",
	floor: [
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
	],
	dungeon: [
		"[==(==]",
		"[  ~  ]",
		"[w   W]",
		"[     ]",
		"[l   l]",
		",__(__."
	],
	ornaments: [
		"       ",
		"       ",
		"       ",
		"       ",
		"   @   ",
		"       ",
	],
	async setup() {
		const [topDoor, bottomDoor] = DM.dungeon.get('door');
		topDoor.interact = (player) => {DM.go(3)}
		bottomDoor.interact = (player) => {DM.go(1,0)}

		const smallPotion = DM.dungeon.get("small-health")[0];
		const largePotion = DM.dungeon.get("large-health")[0];
		if (DM.locals.tutorialSmallPotion) {
			smallPotion.destroy();
		} else {
			smallPotion.interact = (player) => {
				DM.player?.dialog(`A small potion. Tastes good.`);
				player.increaseHealth(1);
				DM.locals.tutorialSmallPotion = true;
				smallPotion.destroy();
			}
		}

		if (DM.locals.tutorialLargePotion) {
			largePotion.destroy();
		} else {
			largePotion.interact = (player) => {
				DM.player?.dialog(`A larger potion. I feel so much better now.`);
				player.increaseHealth(10);
				DM.locals.tutorialLargePotion = true;
				largePotion.destroy();
			}
		}
	},
	tiles: {
	}
};
export default cLevel3;