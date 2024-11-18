import { interact } from "../objects";

const cLevel6 = {
	title: "Dungeon - C5",
	floor: [
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
		"[J D J]",
		"[     ]",
		"[W    ]",
		"[     __________]",
		"[          %   J]",
		"[         %     ]",
		"[        %     ~?",
		"[         %     ]",
		"[J         %   J]",
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
		"   @",
		"",
	],
	async setup() {
		const [rightDoor, bottomDoor] = DM.dungeon.get('door');

		rightDoor.interact = (player) => {
			if (!DM.locals.tutorialSwordChest) {
				DM.player?.dialog(`I don't want to miss out on the chest in this room.`)
			} else {
				DM.go(6);
			}
		};

    bottomDoor.interact = (player) => {
		DM.go(3, 0);
    };

    const [chest] = DM.dungeon.get("large-chest-1");

		if (DM.locals.tutorialSwordChest) {
			chest.destroy();
		} else {
			chest.interact = (player) => {
				DM.player?.dialog(`This rusted sword...
Its worn blade tells a story
of battles long past.
As I grasp it, a strange
familiarity washes over me --
a reunion with an old friend.
Beside it lies a scroll, its
parchment fragile with age.
It carries an oath once spoken.
An oath I vowed never to forget.`);
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
