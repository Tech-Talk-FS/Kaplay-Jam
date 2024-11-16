import { interact } from "../objects";

const cLevel4 = {
	title: "Dungeon - C3",
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
		"[a   a]",
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
			// TODO: Permanent unlock here
			if (!player.unlockedCLvl3) {
				DM.player?.dialog(`
				It's locked. Could there be a key here?
				`);
			} else {
				go("main", 2);
			}
		}
		bottomDoor.interact = (player) => {
			DM.player?.dialog(`
			I don't see a reason to return.
			`);
		}

		const torches = DM.dungeon.get('torch');
		torches.forEach((torch, index) => {
			torch.interact = (player) => {
				DM.player?.dialog(`
				Doesn't seem like it's
				been lit in years.
				`);
			}
		});
	},
	tiles: {
		
	}
};
export default cLevel4