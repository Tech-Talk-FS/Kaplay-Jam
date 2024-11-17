import { hazard, interact } from "../objects";

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
		"[l~        l]",
		"[           ]",
		"[~          ]",
		",_______<   ]",
		"        [   ]",
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
	setup(){
		DM.player.dialog(`What... 
			Where am I? 
			How Long have I been here?
A faint voice can be heard 
"Only the penatant can rise from the depths"`, true, 1e2);
	},
	tiles: {
			l:()=>[
				state('idle', ['idle', 'attack']),
				area(),
				hazard(1, 10, 2),
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