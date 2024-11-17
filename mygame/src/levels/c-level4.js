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
		"[  ~  ]",
		"[     ]",
		"[     ]",
		"[     ]",
		"[3   #____________]",
		"[       ]  [      ]",
		"[      ~?  /~     ]",
		"[       ]  [   ~h ]",
		"[       ]  [      ]",
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
		
		topDoor.interact = (player) => {DM.go(5,0)}
		
		rightMiddleDoor.interact = (player) => {
			if (!DM.locals.ironKey) {
				DM.player?.dialog(`"Without the Iron Key, you will not escape."`);
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