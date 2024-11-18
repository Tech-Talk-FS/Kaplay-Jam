import { interact } from "../objects";

const cLevel4 = {
	title: "Dungeon - C3",
	floor: [
		"       XXXXXXXXXXXX",
		"       XXXXXXXXXXXX",
		"       XXXXXXXXXXXX",
		"       XXXXXXXXXXXX",
		"       XXXXXXXXXXXX",
		"                   ",
		"         XX        ",
		"        XXXX       ",
		"         XX        ",
		"         XX        ",
		"                   ",
	],
	dungeon: [
		"[==(==]",
		"[J ~ J]",
		"[     ]",
		"[   z ]",
		"[     ]",
		"[3   #____________]",
		"[J   z J]  [J   zJ]",
		"[      ~?  /~     ]",
		"[       ]  [   ~h ]",
		"[Jz$   J]  [J    J]",
		",_____________(___.",
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
		"              @",
		"",
	],
	async setup() {
		const [topDoor, leftMiddleDoor, rightMiddleDoor, trapDoor, bottomDoor] = DM.dungeon.get('door');
		
		topDoor.interact = (player) => {DM.go(5)}
		
		rightMiddleDoor.interact = (player) => {
			if (!DM.locals.silverKey) {
				DM.player?.dialog(`"Without the kingdom's first key, you will not make it far."`);
			} else {
				DM.go(3, 1);
			}
		}
		
		leftMiddleDoor.interact = (player) => {DM.go(3, 2)}
		
		trapDoor.interact = (player) => {DM.go(4)}

		bottomDoor.interact = (player) => {DM.go(2, 0)}
	},
	tiles: {

	}
};
export default cLevel4;