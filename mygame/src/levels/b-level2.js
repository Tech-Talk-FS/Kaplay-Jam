import { interact } from "../objects";

const cLevel18 = {
	title: "Dungeon - C18",
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
		"[===============]",
		"[ $        ]    ]",
		"[   $      ]    ]",
		"/         $     ]",
		"[          D    ]",
		"[  $  $    ]    ]",
		"[  $       ]    ]",
		"[____________)__]",
	],
	ornaments: [
		" b",
		"",
		"",
		"",
		"",
		"",
		"             @   ",
		"",
	],
	async setup() {
		const [wDoor, sDoor] = DM.dungeon.get("door");

		wDoor.interact = (player) => {
			// DM.go(9);
            console.log("here");
            
		}
		sDoor.interact = (player) => {
			// DM.go(7, 0);
            console.log("there");
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
			DM.player?.dialog(`The materials laid within allow
me to repair the sword. It
slowly returns to its former glory.`);
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
export default cLevel18;