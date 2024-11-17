import { interact } from "../objects";

const cLevel2 = {
	title: "Dungeon - C1",
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
		"[l ~ l]",
		"[     ]",
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
		topDoor.interact = (player) => {
			if (!DM.locals.unlockedLvl2) {
				DM.player?.dialog(`Huh? The door is stuck...`);
			} else {
				DM.go(2);
			}
		}
		bottomDoor.interact = (player) => {
			DM.go(0, 0);
		}

		const torch = DM.dungeon.get('torch')[0];
		torch.interact = (player) => {
			if (!DM.locals.unlockedLvl2) {
				DM.player?.dialog(`Oh? A button at the base. Might as well press it.`)
				DM.locals.unlockedLvl2 = true;
			}
			else {
				DM.player?.dialog(`The button is already pressed.`)
			}
		}
	},
	tiles: {
	}
};
export default cLevel2;