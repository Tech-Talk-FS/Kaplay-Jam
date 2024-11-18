import { interact } from "../objects";

export const bLevel2 = {
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
		"/ $        ]    ]",
		"[   $      ]    ]",
		"[         $     ]",
		"[          D    ]",
		"[  $  $    ]    ]",
		"[  $       ]    ?",
		"[_______________]",
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
		DM.locals.lvl14Skels = 0;
		wDoor.interact = (player) => {
			DM.go(9, 3);
		}
		sDoor.interact = (player) => {
			DM.go(13);
		}

		const [chest] = DM.dungeon.get("large-chest-1");
		const skeletons = DM.dungeon.get("skeleton");

		if (DM.locals.lvl14ChestCollected) {
			chest.destroy();
		}
		else if(DM.locals.lvl14Skels !== skeletons.length) {
			chest.hidden = true;
			chest.paused = true;
		}

		chest.interact = (player) => {
			DM.player?.dialog(`The materials laid within allow
me to repair the sword. It
slowly returns to its former glory.`);
			DM.locals.lvl14ChestCollected = true;
			chest.destroy();
			player.increaseDamage();
		}

		const [banner] = DM.ornaments.get("banner");

		banner.interact = (player) => {
			DM.player?.dialog(`"The fearless are rewarded for their efforts."`);
		}

		skeletons.forEach((skeleton, index) => {
			if (DM.locals.lvl14Skels>index) {
				skeleton.destroy();
			}
			skeleton.onDeath(action => {
				DM.locals.lvl14Skels++;
				if (DM.locals.lvl14Skels === skeletons.length) {
					chest.hidden = false;
					chest.paused = false;
				}
			});
		});
	},
	tiles: {
	}
};