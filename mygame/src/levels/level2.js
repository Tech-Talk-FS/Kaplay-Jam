import { interact, hazard } from "../objects";
import { MAIN_SHEET } from "../charSheets";

const level2 = {
	title: "Dungeon - 1",
	floor: [
		"XXXXXXXXX",
		"X        ",
		"X        ",
		"X        "

	],
	dungeon:[
		"[=(======]",
		"[ ~  Z   ]",
		"[ Z    ~ ?",
		"[  Z     ]"
	],
	ornaments:[
		"",
		"       @"
	],
	setup(){
		DM.locals.jlvl2 = DM.locals.jlvl2 ?? 0;
	},
	tiles: {
		"/": ()=>[
			interact(() => DM.go(9, 1))
		],
		"(": ()=>[
			interact(player=>{
				if(DM.locals.jlvl2 === 3) return DM.go(12);
				player.dialog("This door wont budge...\nWhats that!");
				for(const skel of DM.dungeon.get('skel')){
					DM.dungeon.add([...DM.tiles.$(), pos(skel.pos)]);
					skel.destroy();
				}
			})
		],
		"$": ()=>[
			{onDied: ()=>{
				DM.locals.jlvl2++;	
			}}
		],
		"M": ()=>[
			area({collisionIgnore: 'enemy'}),
		]
	}
};
export default level2;