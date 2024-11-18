import { interact } from "../objects";

const cLevel8 = {
	title: "Dungeon - C7",
	floor: [
		"            ",
		"            ",
		"            ",
		"            ",
		"            ",
		"       XXXXX",
		"       XXXXX",
		"       XXXXX",
		"       XXXXX",
	],
	dungeon: [
		"[==========]",
		"[          ]",
		"/         M]",
		"[          ]",
		"[     >____]",
		"[     ]     ",
		"[    ~?     ",
		"[     ]     ",
		",_____.     ",
	],
	ornaments: [
		"   b n",
		"",
		" @     e",
		"",
		"",
		"",
		"",
		"",
		"",
	],
	async setup() {
		const [leftDoor, rightDoor] = DM.dungeon.get("door");

		leftDoor.interact = (player) => {
			DM.go(6,0);
		}

		rightDoor.interact = (player) => {
			if (collidingWith.length) {
				DM.go(8);
			} else {
				DM.player?.dialog(`A strange mechanism is on the door. I can't open by hand.`);
			}
		}

		const [statue] = DM.ornaments.get("goblin-statue");

		const originalStatuePosition = statue.pos;

		const [banner] = DM.ornaments.get("banner");

		banner.interact = (player) => {
			DM.player?.dialog(`"To err is human. The button shall correct your mistake."`);
		}

		const [button] = DM.ornaments.get("coin");

		button.interact = (player) => {
			statue.pos = originalStatuePosition;
		}
		
		const [dirt] = DM.dungeon.get("large-dirt");

		const collidingWith = [];

		dirt.onCollide("player", (player) => {
			if (!collidingWith.length) {
				DM.player?.dialog(`*KACHUNK*`, false);
			}
			
			if(!collidingWith.includes("player")) {
				collidingWith.push("player");
			}
		});

		dirt.onCollide("goblin-statue", (statue) => {
			if (!collidingWith.length) {
				DM.player?.dialog(`*KACHUNK*`, false);
			}
			
			if(!collidingWith.includes("statue")) {
				collidingWith.push("statue");
			}
		});

		dirt.onCollideEnd("player", (player) => {
			collidingWith.splice(collidingWith.indexOf("player"), 1);
			if (!collidingWith.length) {
				DM.player?.dialog(`*THUNK*`, false);
			}
		});

		dirt.onCollideEnd("goblin-statue", (statue) => {
			collidingWith.splice(collidingWith.indexOf("statue"), 1);
			if (!collidingWith.length) {
				DM.player?.dialog(`*THUNK*`, false);
			}
		});
	},
	tiles: {
		"M": () => [
			area({static:true}),
		]
	}
};
export default cLevel8;