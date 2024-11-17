import { hazard, interact } from "../objects";

const cLevel7 = {
	title: "Dungeon - C6",
	floor: [
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
	],
	dungeon: [
		"[_________]",
		"[  !      ]",
		"/        ~?",
		"[       ! ]",
		",_________.",
	],
	ornaments: [
		"",
		"",
		" @",
		"",
		"",
	],
	async setup() {
		if (!DM.locals.visitLvl7) {
			DM.player?.dialog(`Torches have been recklessly placed. I better be careful.`);
			DM.locals.visitLvl7 = true;
		}

		const [leftDoor, rightDoor] = DM.dungeon.get('door');

		leftDoor.interact = (player) => {
			DM.go(5, 0);
		};

		rightDoor.interact = (player) => {
			DM.go(7);
		};
	},
	tiles: {
        "!": () => [
            area(),
            state('idle', ['idle', 'attack']),
			hazard(1, 10, 1.5)
        ],
	}
};
export default cLevel7;