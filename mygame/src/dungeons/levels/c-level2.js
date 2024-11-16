const cLevel2 = [
	"Dungeon - C1",
	[
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
		"       ",
	],
	[
		"[==(==]",
		"[l   l]",
		"[     ]",
		"[     ]",
		"[l   l]",
		",__(__."
	],
	[
		"       ",
		"       ",
		"       ",
		"       ",
		"   @   ",
		"       ",
	],
	async () => {
		const [topDoor, bottomDoor] = DM.dungeon.get('door');
		topDoor.interact = (player) => {
			// TODO: Permanent unlock here
			if (!player.unlockedCLvl2) {
				DM.player?.dialog(`
				Huh? The door is stuck...
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
				if (!index) {
					DM.player?.dialog(`
					Oh? A button at the base.
					Might as well press it.
					`)
					player.unlockedCLvl2 = true;
					return;
				}
				DM.player?.dialog(`
				Doesn't seem like it's
				been lit in years.
				`)
			}
		});
	}
];
export default cLevel2