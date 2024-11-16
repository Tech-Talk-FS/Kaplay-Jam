import { interact } from "../objects";

const level1 = {
	title:"Dungeon - 0",
	floor:[
		"XXXXXX XXXXXX",
		"X           X",
		"X           X",
		"X           X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
		"XXXXXXXXX   X",
	],
	dungeon: [
		"[=======(===]",
		"[le        l]",
		"[           ]",
		"[3   E     #]",
		",_______<   ]",
		"        [ % ]",
		"        [   ]",
		"        [  V]",
		"        ,___."
	],
	//ornaments
	ornaments: [
		"    b",
		"            ",
		"   @        ",
		"            ",
		"            ",
		"          w ",
		"          W ",
		"           X",
	],
	async setup(){

	},
	tiles: {
			l:()=>[
				interact(player=>player.dialog("This hasn't been\nlit in years"))
			],
			"(":()=>[
				interact(player=>player.dialog("The door\nis stuck"))
			],
			b:()=>[
				interact(player=>{
					player.dialog('Not all is as it seems"\n... ')
					const web = DM.ornaments.get('web')[0];
					web.destroy();
					player.unlockedLvl1 = true;
				})
			],
			V:()=>[
				interact(player=>{
					if(player.unlockedLvl1){ 
						DM.dungeon.get('goblin-statue').forEach(g=>g.enterState('idle'));
					}
				})
			],
			"#": ()=>[
				{onDied(){
					go("main", 1)
				}}
			]
		}
};
export default level1;