import { interact, hazard } from "../objects";
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
	async setup(){
		DM.player.dialog(`What... 
			Where am I? 
			How Long have I been here?
A faint voice can be heard 
"Only the penatant can rise from the depths"`)
	},
	tiles: {
			l:()=>[
				interact(player=>player.dialog("This hasn't been\nlit in years"))
			],
"(": () => [
    interact(player => {

            DM.player?.dialog("Door wLevel 0");
            const desiredLevel = 1;  // Ensure that the desired level index exists
            DM.go(desiredLevel);  // Move to the next level (ensure DM.go is properly implemented)
        }
    )
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