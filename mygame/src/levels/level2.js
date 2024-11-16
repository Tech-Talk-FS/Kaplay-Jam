import { interact } from "../objects";
import { MAIN_SHEET } from "../charSheets";

const level2 = {
	title: "Dungeon - 1",
	floor: [
		"XXXXXXXXX",
		"X        ",
		"X        ",
		"X        ",
		"X        ",
		"X        ",
		"X        ",
		"X        ",
		"X        ",
	],
	dungeon:[
		"[========]",
		"[   @    ]",
		"[zZz     ]",
		"[        ]",
		"[        ]",
		"[        ]",
		"[        ]",
		"[        ]",
		"[        ]",
		",________."
	],
	ornaments:[
		"  b    b  "
	],
	setup(){
		const [b1, b2] = DM.ornaments.get('banner');
		const [i1, i2] = [b1.interact, b2.interact]
		b1.interact = player => {
			player.dialog("You were sealed in this tomb for a reason");
			i1(player);
		}
	},
	tiles: {
		b:()=>[
			interact(player => {
				if(!player.interacts) player.interacts = 1;
				else player.interacts++;
				if(player.interacts === 2) DM.dungeon.add([
					sprite('sword', {frame: player.damageAmount, width: 16, height: 16}),
					pos(64, 64),
					area(),
					interact(async (player) => {
						player.increaseDamage();
						console.log(player.damageAmount);
						await wait(1);
						for(const s of DM.dungeon.get('skel')){
							DM.dungeon.add([...MAIN_SHEET.tiles.$(), pos(s.pos)])
							s.destroy()
						}
					}, true)
				])
			})
		]
	}

};
export default level2;