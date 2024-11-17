import { interact } from "../objects";

const cLevel6 = {
	title: "Dungeon - C5",
	floor: [
		"      XXXXXXXXXXX",
		"      XXXXXXXXXXX",
		"      XXXXXXXXXXX",
		"      XXXXXXXXXXX",
		"      XXXXXXXXXXX",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
		"                 ",
	],
	dungeon: [
		"[=====]",
		"[  D  ]",
		"[W    ]",
		"[     ]",
		"[     ]",
		"[     __________]",
		"[          %    ]",
		"[         %     ]",
		"[        %     ~?",
		"[         %     ]",
		"[          %    ]",
		",__(____________.",
	],
	ornaments: [
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"   @",
		"",
	],
	async setup() {
		const [rightDoor, bottomDoor] = DM.dungeon.get('door');

		rightDoor.interact = (player) => {
			DM.go(6);
		};

		bottomDoor.interact = (player) => {
			DM.go(3, 0);
		};

		const [chest] = DM.dungeon.get('large-chest-1');

		if (DM.locals.tutorialSwordChest) {
			chest.destroy();
		} else {
			chest.interact = (player) => {
				DM.player?.dialog(`A sword! This will be useful.`);
				DM.locals.tutorialSwordChest = true;
				chest.destroy();
				player.increaseDamage();
			}
		}
	},
	tiles: {
	}
};
export default cLevel6;