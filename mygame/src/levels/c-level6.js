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
			if (!DM.tutorialSwordChest) {
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
Its age speaks its value.
With this in hand...
It feels as though
I've reconnected with
an old friend.
Alongside it rests a scroll.
It bears an oath once spoken.
An oath I swore not to forget.`);
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
