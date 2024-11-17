import { interact } from "../objects";

const cLevel9 = {
	title: "Dungeon - C8",
	floor: [
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
	],
	dungeon: [
		"[===(===========]",
		"[   ~]   $   $  ]",
		"[    ]          ]",
		"/    D     $    ]",
		"[               ]",
		"[    ]          ]",
		"[    ]   $   $  ]",
		",_______________.",
	],
	ornaments: [
		" b",
		"",
		"",
		" @",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	],
	async setup() {
		DM.player.increaseDamage();
		const [topDoor, leftDoor] = DM.dungeon.get("door");

		topDoor.interact = (player) => {
			DM.go(9);
		}
		leftDoor.interact = (player) => {
			DM.go(7, 0);
		}

		const [chest] = DM.dungeon.get("large-chest-1");
		const skeletons = DM.dungeon.get("skeleton");

		if (DM.locals.lvl9ChestCollected) {
			chest.destroy();
		}
		else if(DM.locals.skeletonLvl9Killed?.length !== skeletons.length) {
			chest.hidden = true;
			chest.paused = true;
		}

		chest.interact = (player) => {
			DM.player?.dialog(`Another sword! Looks sturider.`);
			DM.locals.lvl9ChestCollected = true;
			chest.destroy();
			player.increaseDamage();
		}

		const [banner] = DM.ornaments.get("banner");

		banner.interact = (player) => {
			DM.player?.dialog(`"The fearless are rewarded for their efforts."`);
		}

		skeletons.forEach((skeleton, index) => {
			if (DM.locals.skeletonLvl9Killed?.includes(index)) {
				skeleton.destroy();
			}
			skeleton.onDeath(action => {
				if (!DM.locals.skeletonLvl9Killed) {
					DM.locals.skeletonLvl9Killed = [];
				}
				DM.locals.skeletonLvl9Killed.push(index);

				if (DM.locals.skeletonLvl9Killed.length === skeletons.length) {
					chest.hidden = false;
					chest.paused = false;
				}
			});
		});
	},
	tiles: {
	}
};
export default cLevel9;