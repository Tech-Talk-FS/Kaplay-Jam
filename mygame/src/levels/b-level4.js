import { interact } from "../objects";

export const bLevel4 = {
	title: "Dungeon - C4",
	floor: [
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
		"           ",
	],
	dungeon: [
		"[=========]",
		"[e   S   e]",
		"[ e  e  e ]",
		"[         ]",
		"[         ]",
		"[         ]",
		",___)_____.",
	],
	ornaments: [
		"  !     !  ",
		"           ",
		"          ",
		"",
		"",
		"    @",
		"",
	],
	async setup() {
		await wait(3)
		shake(10);
		for(const stat of DM.dungeon.get('goblin-statue')){
			stat.wakeUp();
		}
	},
	tiles: {
		")": ()=>[
			interact(()=>DM.go(12, 0))
		],
		"S": ()=>[
			interact(player=>{
				DM.locals.goldenKey = true;
				player.dialog(`A Golden Key...
I can feel it weigh down on me.
Visions of turning it stir
within me-- perhaps a hidden
door or a secret chamber?
Along with it, another
sword upgrade. My resolve
strengthens further.`)
			})
		]

	}
};